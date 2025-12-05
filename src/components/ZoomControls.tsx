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
                className="bg-background/60 dark:bg-background/60 backdrop-blur-2xl border-border/50 dark:border-border/50 h-10 w-10 rounded-lg shadow-2xl text-foreground"
            >
                <Plus className="h-5 w-5" />
                <span className="sr-only">Zoom in</span>
            </Button>
            <Button
                variant="outline"
                size="icon"
                onClick={() => map.zoomOut()}
                className="bg-background/60 dark:bg-background/60 backdrop-blur-2xl border-border/50 dark:border-border/50 h-10 w-10 rounded-lg shadow-2xl text-foreground"
            >
                <Minus className="h-5 w-5" />
                <span className="sr-only">Zoom out</span>
            </Button>
            <Button
                variant="outline"
                size="icon"
                onClick={() => map.setView([40.9645, -76.8845], 15)}
                className="bg-background/60 dark:bg-background/60 backdrop-blur-2xl border-border/50 dark:border-border/50 h-10 w-10 rounded-lg shadow-2xl text-foreground"
            >
                <Home className="h-5 w-5" />
                <span className="sr-only">Reset view</span>
            </Button>
        </div>
    );
}
