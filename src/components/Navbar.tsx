import { Coffee, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useState } from "react";

export default function Navbar() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-[1000] p-4 pointer-events-none">
        <div className="flex flex-row items-center justify-between px-5 py-3 bg-background/60 backdrop-blur-2xl border border-border/50 rounded-lg shadow-2xl pointer-events-auto w-full">
          <div
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => window.dispatchEvent(new Event("show-welcome-modal"))}
          >
            <Coffee className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground font-serif tracking-wide leading-none pt-0.5">
              Lewisburg Coffee Map
            </h1>
          </div>
        </div>
      </div>

      {/* About Dialog Overlay */}
      {showAbout && (
        <div className="absolute inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-black/60 backdrop-blur-2xl border border-white/10 text-white p-6 relative shadow-2xl rounded-xl">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAbout(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-[#8B4513]/20 rounded-full">
                <Coffee className="w-8 h-8 text-[#8B4513]" />
              </div>
              <h2 className="text-2xl font-bold font-serif">Lewisburg Coffee Map</h2>
              <p className="text-gray-300 font-serif leading-relaxed">
                Explore the best coffee spots in Lewisburg, PA.
                Curated for coffee enthusiasts.
              </p>

              <div className="w-full h-px bg-white/10 my-4" />

              <div className="text-xs text-gray-500 space-y-2 font-sans">
                <p>Map Data &copy; <a href="https://www.openstreetmap.org/copyright" className="underline hover:text-gray-300">OpenStreetMap</a> contributors</p>
                <p>Tiles &copy; <a href="https://carto.com/attributions" className="underline hover:text-gray-300">CARTO</a></p>
                <p>Built with Next.js, Tailwind, and Leaflet</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
