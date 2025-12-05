"use client";

import { Locate } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useMap } from "react-leaflet";
import { useState } from "react";

export function LocateControl() {
    const map = useMap();
    const [loading, setLoading] = useState(false);

    const handleLocate = () => {
        setLoading(true);
        map.locate().on("locationfound", function (e) {
            map.flyTo(e.latlng, 16);
            setLoading(false);
        }).on("locationerror", function () {
            setLoading(false);
            alert("Could not access your location");
        });
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={handleLocate}
            disabled={loading}
            className="bg-background/60 dark:bg-background/60 backdrop-blur-2xl border-border/50 dark:border-border/50 h-10 w-10 rounded-lg shadow-2xl text-foreground"
        >
            <Locate className={`h-5 w-5 ${loading ? 'animate-pulse' : ''}`} />
            <span className="sr-only">Locate me</span>
        </Button>
    );
}
