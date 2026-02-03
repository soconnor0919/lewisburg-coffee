"use client";

import * as React from "react";
import { Layers, Moon, Sun, Globe } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface MapStyleControlProps {
    currentStyle: string;
    onStyleChange: (style: string) => void;
}

export function MapStyleControl({ currentStyle, onStyleChange }: MapStyleControlProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl border border-glass-border bg-glass-background text-glass-text-primary shadow-lg backdrop-blur-md transition-all hover:bg-glass-border hover:text-white">
                    <Layers className="h-5 w-5" />
                    <span className="sr-only">Change map style</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-background/90 backdrop-blur-xl">
                <DropdownMenuItem onClick={() => onStyleChange("dark")} className={currentStyle === "dark" ? "bg-accent" : ""}>
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStyleChange("light")} className={currentStyle === "light" ? "bg-accent" : ""}>
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStyleChange("satellite")} className={currentStyle === "satellite" ? "bg-accent" : ""}>
                    <Globe className="mr-2 h-4 w-4" />
                    Satellite
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
