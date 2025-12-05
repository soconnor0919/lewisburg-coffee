"use client";

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Coffee, MapPin } from "lucide-react";

export function WelcomeModal() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
        if (!hasSeenWelcome) {
            setOpen(true);
        }

        const handleShowWelcome = () => setOpen(true);
        window.addEventListener("show-welcome-modal", handleShowWelcome);
        return () => window.removeEventListener("show-welcome-modal", handleShowWelcome);
    }, []);

    const handleClose = () => {
        setOpen(false);
        localStorage.setItem("hasSeenWelcome", "true");
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-xl border-border/50">
                <DialogHeader>
                    <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-fit">
                        <Coffee className="h-8 w-8 text-primary" />
                    </div>
                    <DialogTitle className="text-center text-2xl font-serif">Welcome to the Lewisburg&nbsp;Coffee&nbsp;Map</DialogTitle>
                    <DialogDescription className="text-center text-muted-foreground pt-2">
                        Discover the best coffee spots in Lewisburg, PA.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border/50">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium leading-none">Explore the Map</h4>
                            <p className="text-sm text-muted-foreground">
                                Navigate through the town to find your next caffeine fix.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border/50">
                        <Coffee className="h-5 w-5 text-primary mt-0.5" />
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium leading-none">View Details</h4>
                            <p className="text-sm text-muted-foreground">
                                Click on any marker to see photos, hours, and get directions.
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
