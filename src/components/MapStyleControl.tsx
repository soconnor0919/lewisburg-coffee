"use client";

import * as React from "react";
import { Layers, Moon, Sun, Globe } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useTheme } from "next-themes";
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
    const { setTheme } = useTheme();

    const handleStyleChange = (style: string) => {
        onStyleChange(style);
        if (style === "dark") setTheme("dark");
        if (style === "light") setTheme("light");
        if (style === "satellite") setTheme("dark"); // Satellite looks better with dark UI
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl border border-glass-border bg-glass-background text-glass-text-primary shadow-lg backdrop-blur-md transition-all hover:bg-glass-border">
                    <Layers className="h-5 w-5" />
                    <span className="sr-only">Change map style</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-glass-background backdrop-blur-xl border-glass-border">
                <DropdownMenuItem onClick={() => handleStyleChange("dark")} className={`text-glass-text-primary focus:bg-glass-border focus:text-glass-text-primary cursor-pointer ${currentStyle === "dark" ? "bg-glass-border" : ""}`}>
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStyleChange("light")} className={`text-glass-text-primary focus:bg-glass-border focus:text-glass-text-primary cursor-pointer ${currentStyle === "light" ? "bg-glass-border" : ""}`}>
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStyleChange("satellite")} className={`text-glass-text-primary focus:bg-glass-border focus:text-glass-text-primary cursor-pointer ${currentStyle === "satellite" ? "bg-glass-border" : ""}`}>
                    <Globe className="mr-2 h-4 w-4" />
                    Satellite
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
