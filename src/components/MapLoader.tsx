"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">Loading Map...</div>
});

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

interface MapLoaderProps {
    shops: CoffeeShop[];
    onShopSelect: (shop: CoffeeShop) => void;
    selectedShop: CoffeeShop | null;
}

export default function MapLoader({ shops, onShopSelect, selectedShop }: MapLoaderProps) {
    return <Map shops={shops} onShopSelect={onShopSelect} selectedShop={selectedShop} />;
}
