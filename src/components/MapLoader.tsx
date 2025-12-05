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
}

interface MapLoaderProps {
    shops: CoffeeShop[];
    onShopSelect: (shop: CoffeeShop) => void;
}

export default function MapLoader({ shops, onShopSelect }: MapLoaderProps) {
    return <Map shops={shops} onShopSelect={onShopSelect} />;
}
