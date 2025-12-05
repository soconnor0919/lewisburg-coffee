"use client";

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Coffee } from 'lucide-react';
import Navbar from "./Navbar";

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
}

const Map = ({ shops, onShopSelect }: MapProps) => {
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
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>
  </div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
        });
    };

    const customIcon = createCustomIcon();

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
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
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
