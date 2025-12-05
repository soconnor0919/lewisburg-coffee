"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">Loading Map...</div>
});

export default function MapLoader({ shops, onShopSelect }: { shops: any[], onShopSelect: (shop: any) => void }) {
    return <Map shops={shops} onShopSelect={onShopSelect} />;
}
