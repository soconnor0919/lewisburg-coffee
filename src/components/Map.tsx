"use client";

import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from "next-themes";
import { MapStyleControl } from "./MapStyleControl";
import { LocateControl } from './LocateControl';
import { ZoomControls } from "./ZoomControls";

interface CoffeeShop {
    id: number;
    name: string;
    description: string;
    lat: number;
    lng: number;
    address: string;
    phone: string;
    website: string;
    image: string;
}

interface MapProps {
    shops: CoffeeShop[];
    onShopSelect: (shop: CoffeeShop) => void;
    selectedShop: CoffeeShop | null;
    isDiscoveryOpen: boolean;
}

const MapController = ({ selectedShop, isDiscoveryOpen }: { selectedShop: CoffeeShop | null, isDiscoveryOpen: boolean }) => {
    const map = useMap();
    const prevOpenRef = useRef(isDiscoveryOpen);

    useEffect(() => {
        // Handle general panning when drawer toggles (and no shop is selected)
        const isDesktop = window.innerWidth >= 640;

        if (prevOpenRef.current !== isDiscoveryOpen) {
            if (!selectedShop && isDesktop) {
                // If opening, we want to shift the view to the right (so panning map left? wait)
                // If drawer opens on LEFT, the center of the remaining view is to the RIGHT.
                // We want the content to move into that new center.
                // So we pan the map in the POSITIVE X direction?
                // Test: map.panBy([200, 0]) moves the map image 200px to the RIGHT relative to the viewport.
                // This means a point at x=0 moves to x=200.
                // This puts it into the open area. Correct.

                // Inverting based on user feedback that it shifted wrong way.
                // Opening -> Shift Map Image Left (View Right?) -> offset [-200, 0]
                // Closing -> Shift Map Image Right (View Left?) -> offset [200, 0]
                const offset = isDiscoveryOpen ? [-200, 0] : [200, 0];
                map.panBy(offset as [number, number], {
                    animate: true,
                    duration: 0.5
                });
            }
            prevOpenRef.current = isDiscoveryOpen;
        }
    }, [isDiscoveryOpen, selectedShop, map]);

    useEffect(() => {
        if (selectedShop) {
            const targetLat = selectedShop.lat;
            const targetLng = selectedShop.lng;

            // Calculate offset if discovery panel is open and we're on desktop
            const flyToOption = {
                duration: 1.5,
                easeLinearity: 0.25,
            };

            const isDesktop = window.innerWidth >= 640;

            if (isDiscoveryOpen && isDesktop) {
                // We need to offset the center so the point appears to the right of the drawer
                // The drawer is 400px wide. We want to shift the center left by 200px (half drawer width)
                // so that the target point appears 200px to the right of current center

                // Get current zoom
                const zoom = 16;

                // Subtract offset (shift 'center' to the left, which moves 'view' to the right? Wait.)
                // If we want the point to be at x + 200 (screen coords relative to center),
                // we need the map center to be at x - 200 relative to point.
                // Actually simpler: We want the point (targetLat, targetLng) to be at screen coordinates (width/2 + 200, height/2).
                // Or simply: shift the target point by -200px in x before passing to flyTo? No, flyTo takes strict LatLng.

                // Correct approach:
                // Find the LatLng that, when centered, puts our target LatLng at the desired pixels.
                // Center + Offset = Target -> Center = Target - Offset

                const targetPoint = map.project([targetLat, targetLng], zoom);
                // We want the target to appear 200px (half drawer width) to the right of the map center.
                // So the new center should be 200px LEFT of the target.
                const newCenterPoint = targetPoint.subtract([200, 0]);
                const newCenter = map.unproject(newCenterPoint, zoom);

                map.flyTo(newCenter, zoom, flyToOption);
            } else {
                map.flyTo([targetLat, targetLng], 16, flyToOption);
            }
        }
    }, [selectedShop, map, isDiscoveryOpen]);

    return null;
};

const Map = ({ shops, onShopSelect, selectedShop, isDiscoveryOpen }: MapProps) => {
    useEffect(() => {
        // Fix for Leaflet default icon not found
        // @ts-expect-error Fix for Leaflet default icon not found
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    }, []);

    const createCustomIcon = () => {
        return new L.DivIcon({
            className: 'custom-icon',
            html: `<div class="w-8 h-8 bg-[#8B4513]/60 backdrop-blur-md rounded-full border border-white/30 shadow-lg flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><line x1="6" x2="6" y1="2" y2="4" /><line x1="10" x2="10" y1="2" y2="4" /><line x1="14" x2="14" y1="2" y2="4" /></svg>
  </div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
        });
    };

    const customIcon = createCustomIcon();

    const { resolvedTheme, setTheme } = useTheme();
    const [mapStyle, setMapStyle] = useState(resolvedTheme === 'light' ? 'light' : 'dark');

    // Sync map style with theme
    useEffect(() => {
        if (resolvedTheme === 'dark' && mapStyle === 'light') {
            setMapStyle('dark');
        } else if (resolvedTheme === 'light' && (mapStyle === 'dark' || mapStyle === 'satellite')) {
            setMapStyle('light');
        }
    }, [resolvedTheme, mapStyle]);

    // Handle manual style change
    const handleStyleChange = (newStyle: string) => {
        setMapStyle(newStyle);
        if (newStyle === 'dark') {
            setTheme('dark');
        } else if (newStyle === 'light') {
            setTheme('light');
        } else if (newStyle === 'satellite') {
            setTheme('dark');
        }
    };

    const getTileLayer = () => {
        switch (mapStyle) {
            case "light":
                return "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
            case "satellite":
                return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
            case "dark":
            default:
                return "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
        }
    };

    const getAttribution = () => {
        switch (mapStyle) {
            case "satellite":
                return 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
            default:
                return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
        }
    };

    return (
        <MapContainer
            center={[40.9645, -76.8845]}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
            zoomControl={false}
            attributionControl={false}
        >
            <MapController selectedShop={selectedShop} isDiscoveryOpen={isDiscoveryOpen} />
            <div className="absolute bottom-8 right-4 z-[1000] flex flex-col gap-2 items-end">
                <LocateControl />
                <ZoomControls />
                <MapStyleControl currentStyle={mapStyle} onStyleChange={handleStyleChange} />
            </div>
            <TileLayer
                attribution={getAttribution()}
                url={getTileLayer()}
            />
            {shops.map((shop) => (
                <Marker
                    key={shop.id}
                    position={[shop.lat, shop.lng]}
                    icon={customIcon}
                    eventHandlers={{
                        click: () => onShopSelect(shop),
                    }}
                >
                    <Tooltip
                        key={`${shop.id}-${selectedShop?.id === shop.id}`}
                        direction="top"
                        offset={[0, -20]}
                        opacity={0.9}
                        permanent={selectedShop?.id === shop.id}
                        className={selectedShop?.id === shop.id ? 'force-show' : ''}
                    >
                        <div className="font-serif font-semibold text-sm">
                            {shop.name}
                        </div>
                    </Tooltip>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
