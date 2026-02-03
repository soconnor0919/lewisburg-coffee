"use client";

import { useState } from "react";
import { AboutModal } from "./AboutModal";

export function CopyrightFooter() {
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    return (
        <>
            <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 flex justify-end p-4">
                <button
                    onClick={() => setIsAboutOpen(true)}
                    className="pointer-events-auto rounded-xl border border-glass-border bg-glass-background px-4 py-2 text-xs text-glass-text-secondary shadow-lg backdrop-blur-md transition-all hover:bg-glass-border hover:text-glass-text-primary hover:scale-105 active:scale-95 cursor-pointer"
                >
                    © 2026 Sean O'Connor. All Rights Reserved.
                </button>
            </div>
            <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
        </>
    );
}
