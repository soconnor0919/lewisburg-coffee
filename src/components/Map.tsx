"use client";

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Coffee } from 'lucide-react';

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
        // No longer need default icon fix as we are using custom icons
    }, []);

    const createCustomIcon = () => {
        const iconMarkup = renderToStaticMarkup(
            <div className="relative flex items-center justify-center w-8 h-8 bg-[#8B4513] rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform">
                <Coffee className="w-5 h-5 text-white" />
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-[#8B4513]"></div>
            </div>
        );

        return L.divIcon({
            html: iconMarkup,
            className: 'custom-marker', // Add a class for potential extra styling
            iconSize: [32, 32],
            iconAnchor: [16, 32], // Anchor at bottom center
            popupAnchor: [0, -32],
        });
    };

    const customIcon = createCustomIcon();

    return (
        <MapContainer
            center={[40.9645, -76.8844]}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
        >
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
