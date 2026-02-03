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
            <DialogContent className="sm:max-w-md bg-glass-background backdrop-blur-xl border-glass-border font-serif text-glass-text-primary">
                <DialogHeader>
                    <div className="mx-auto bg-glass-border p-3 rounded-full mb-4 w-fit">
                        <Coffee className="h-8 w-8 text-amber-500" />
                    </div>
                    <DialogTitle className="text-center text-2xl font-serif">Welcome to the Lewisburg&nbsp;Coffee&nbsp;Map</DialogTitle>
                    <DialogDescription className="text-center text-glass-text-secondary pt-2">
                        Discover the best coffee spots in Lewisburg, PA.
                        <br />
                        <span className="text-xs text-amber-500/80 font-medium mt-1 block">Created by Sean O'Connor</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3 py-4">
                    <div className="flex items-start gap-4 p-3 rounded-lg bg-glass-border border border-glass-border">
                        <MapPin className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium leading-none text-glass-text-primary">Explore the Map</h4>
                            <p className="text-sm text-glass-text-secondary">
                                Click any marker to see details, photos, and get directions.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-3 rounded-lg bg-glass-border border border-glass-border">
                        <Search className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium leading-none text-glass-text-primary">Search & Filter</h4>
                            <p className="text-sm text-glass-text-secondary">
                                Use the discovery panel to browse and search all coffee shops.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-3 rounded-lg bg-glass-border border border-glass-border">
                        <Navigation className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium leading-none text-glass-text-primary">Find Your Location</h4>
                            <p className="text-sm text-glass-text-secondary">
                                Use the locate button to center the map on your current position.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button onClick={handleClose} className="w-full sm:w-auto min-w-[120px] bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                        Start Exploring
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
