"use client";

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import Navbar from "./Navbar";
import { MapStyleControl } from "./MapStyleControl";
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
}

const MapController = ({ selectedShop }: { selectedShop: CoffeeShop | null }) => {
    const map = useMap();

    useEffect(() => {
        if (selectedShop) {
            map.flyTo([selectedShop.lat, selectedShop.lng], 16, {
                duration: 1.5,
                easeLinearity: 0.25,
            });
        }
    }, [selectedShop, map]);

    return null;
};

const Map = ({ shops, onShopSelect, selectedShop }: MapProps) => {
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
            <Navbar />
            <MapController selectedShop={selectedShop} />
            <div className="absolute bottom-8 right-4 z-[1000] flex flex-col gap-2 items-end">
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
                />
            ))}
        </MapContainer>
    );
};

export default Map;
