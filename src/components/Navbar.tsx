import { Coffee } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-[#8B4513] rounded-full shadow-lg">
                    <Coffee className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white font-serif tracking-wide">
                    Lewisburg Coffee Map
                </h1>
            </div>
            <div className="flex gap-4">
                {/* Placeholder for future links or actions */}
            </div>
        </nav>
    );
}
