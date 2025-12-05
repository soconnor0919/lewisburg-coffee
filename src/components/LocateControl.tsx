import { Locate } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useMap } from "react-leaflet";
import { useState, useEffect, useRef } from "react";
import L from "leaflet";

export function LocateControl() {
    const map = useMap();
    const [loading, setLoading] = useState(false);
    const markerRef = useRef<L.CircleMarker | null>(null);
    const circleRef = useRef<L.Circle | null>(null);

    const handleLocate = () => {
        setLoading(true);
        map.locate({ setView: false, enableHighAccuracy: true });
    };

    useEffect(() => {
        const onLocationFound = (e: L.LocationEvent) => {
            setLoading(false);

            // Remove existing markers
            if (markerRef.current) {
                map.removeLayer(markerRef.current);
            }
            if (circleRef.current) {
                map.removeLayer(circleRef.current);
            }

            // Create accuracy circle
            const radius = e.accuracy / 2;
            circleRef.current = L.circle(e.latlng, {
                radius: radius,
                color: '#4285F4',
                fillColor: '#4285F4',
                fillOpacity: 0.15,
                weight: 1,
                opacity: 0.5
            }).addTo(map);

            // Create location dot (pulsing effect via CSS class if we wanted, but standard circleMarker for now)
            markerRef.current = L.circleMarker(e.latlng, {
                radius: 8,
                fillColor: '#4285F4',
                color: '#ffffff',
                weight: 2,
                opacity: 1,
                fillOpacity: 1
            }).addTo(map);

            map.flyTo(e.latlng, 16);
        };

        const onLocationError = (e: L.ErrorEvent) => {
            setLoading(false);
            console.error("Location error:", e.message);
            alert("Could not access your location");
        };

        map.on("locationfound", onLocationFound);
        map.on("locationerror", onLocationError);

        return () => {
            map.off("locationfound", onLocationFound);
            map.off("locationerror", onLocationError);
        };
    }, [map]);

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
