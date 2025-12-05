"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { Coffee } from "lucide-react";

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
    isDiscoveryOpen: boolean;
    onToggleDiscovery: () => void;
}

export default function MapLoader({ shops, onShopSelect, selectedShop, isDiscoveryOpen, onToggleDiscovery }: MapLoaderProps) {
    const [isLoading, setIsLoading] = useState(true);

    const Map = dynamic(() => import("./Map"), {
        ssr: false,
        loading: () => (
            <div className="w-full h-full relative bg-background">
                <Skeleton className="w-full h-full absolute inset-0" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Coffee className="h-16 w-16 text-muted-foreground/50 animate-pulse" />
                </div>
            </div>
        ),
    });

    useEffect(() => {
        // Small delay to ensure smooth transition
        const timer = setTimeout(() => setIsLoading(false), 100);
        return () => clearTimeout(timer);
    }, []);

    return <Map shops={shops} onShopSelect={onShopSelect} selectedShop={selectedShop} isDiscoveryOpen={isDiscoveryOpen} onToggleDiscovery={onToggleDiscovery} />;
}
