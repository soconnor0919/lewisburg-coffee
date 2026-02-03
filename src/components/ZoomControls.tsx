"use client";

import { Home, Minus, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useMap } from "react-leaflet";

export function ZoomControls() {
    const map = useMap();

    return (
        <div className="flex flex-col gap-2">
            <Button
                variant="outline"
                size="icon"
                onClick={() => map.zoomIn()}
                className="rounded-xl border border-glass-border bg-glass-background text-glass-text-primary shadow-lg backdrop-blur-md transition-all hover:bg-glass-border hover:text-white"
            >
                <Plus className="h-5 w-5" />
                <span className="sr-only">Zoom in</span>
            </Button>
            <Button
                variant="outline"
                size="icon"
                onClick={() => map.zoomOut()}
                className="rounded-xl border border-glass-border bg-glass-background text-glass-text-primary shadow-lg backdrop-blur-md transition-all hover:bg-glass-border hover:text-white"
            >
                <Minus className="h-5 w-5" />
                <span className="sr-only">Zoom out</span>
            </Button>
            <Button
                variant="outline"
                size="icon"
                onClick={() => map.setView([40.9645, -76.8845], 15)}
                className="rounded-xl border border-glass-border bg-glass-background text-glass-text-primary shadow-lg backdrop-blur-md transition-all hover:bg-glass-border hover:text-white"
            >
                <Home className="h-5 w-5" />
                <span className="sr-only">Reset view</span>
            </Button>
        </div>
    );
}
