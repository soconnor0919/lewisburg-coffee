"use client";

import { useEffect, useState, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Coffee, MapPin, Search, Navigation } from "lucide-react";

export function WelcomeModal() {
    const [open, setOpen] = useState(false);
    const openRef = useRef(false);

    useEffect(() => {
        openRef.current = open;
    }, [open]);

    useEffect(() => {
        const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
        if (!hasSeenWelcome) {
            setOpen(true);
        }

        const handleShowWelcome = () => {
            setOpen(!openRef.current);
        };
        window.addEventListener("show-welcome-modal", handleShowWelcome);
        return () => window.removeEventListener("show-welcome-modal", handleShowWelcome);
    }, []);

    const handleClose = () => {
        setOpen(false);
        localStorage.setItem("hasSeenWelcome", "true");
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            localStorage.setItem("hasSeenWelcome", "true");
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-xl border-border/50 font-serif">
                <DialogHeader>
                    <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-fit">
                        <Coffee className="h-8 w-8 text-primary" />
                    </div>
                    <DialogTitle className="text-center text-2xl font-serif">Welcome to the Lewisburg&nbsp;Coffee&nbsp;Map</DialogTitle>
                    <DialogDescription className="text-center text-muted-foreground pt-2">
                        Discover the best coffee spots in Lewisburg, PA. Click on markers, search shops, and find your perfect brew.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3 py-4">
                    <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                        <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium leading-none">Explore the Map</h4>
                            <p className="text-sm text-muted-foreground">
                                Click any marker to see details, photos, and get directions.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                        <Search className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium leading-none">Search & Filter</h4>
                            <p className="text-sm text-muted-foreground">
                                Use the discovery panel to browse and search all coffee shops.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                        <Navigation className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium leading-none">Find Your Location</h4>
                            <p className="text-sm text-muted-foreground">
                                Use the locate button to center the map on your current position.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button onClick={handleClose} className="w-full sm:w-auto min-w-[120px]">
                        Start Exploring
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
