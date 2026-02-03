"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/dialog";
import { Coffee, Github, Heart } from "lucide-react";
import { Button } from "./ui/button";

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-glass-background backdrop-blur-xl border-glass-border text-glass-text-primary">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl font-serif">
                        <Coffee className="h-6 w-6 text-amber-500" />
                        Lewisburg Coffee Map
                    </DialogTitle>
                    <DialogDescription className="text-glass-text-secondary">
                        Discover the best coffee spots in Lewisburg, PA.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <h3 className="font-semibold text-amber-500">About the Project</h3>
                        <p className="text-sm text-glass-text-primary leading-relaxed">
                            A modern, interactive map application built to help locals and visitors find their perfect cup of coffee.
                            Featuring real-time location services, dark/light mode, and a premium seamless experience.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-amber-500">Attribution</h3>
                        <ul className="text-sm text-glass-text-secondary space-y-1 list-disc pl-4">
                            <li>Created by <span className="text-glass-text-primary font-medium">Sean O'Connor</span></li>
                            <li>Built with <span className="text-glass-text-primary font-medium">Next.js 15</span> & <span className="text-glass-text-primary font-medium">React 19</span></li>
                            <li>Styled with <span className="text-glass-text-primary font-medium">Tailwind CSS v4</span></li>
                            <li>Map data provided by <span className="text-glass-text-primary font-medium">OpenStreetMap</span> & <span className="text-glass-text-primary font-medium">Leaflet</span></li>
                            <li>Icons by <span className="text-glass-text-primary font-medium">Lucide React</span></li>
                        </ul>
                    </div>

                    <div className="pt-4 border-t border-glass-border flex flex-col gap-2">
                        <p className="text-xs text-center text-glass-text-secondary flex items-center justify-center gap-1">
                            © 2026 Sean O'Connor. All Rights Reserved.
                        </p>
                        <p className="text-xs text-center text-glass-text-secondary flex items-center justify-center gap-1">
                            Licensed under GPLv3. <Heart className="h-3 w-3 text-red-500 fill-red-500" />
                        </p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button
                        variant="outline"
                        className="gap-2 border-glass-border bg-glass-border/20 hover:bg-glass-border text-glass-text-primary"
                        asChild
                    >
                        <a href="https://github.com/soconnor0919/lewisburg-coffee" target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            View on GitHub
                        </a>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
