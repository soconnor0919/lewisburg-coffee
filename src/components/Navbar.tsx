import { Coffee, PanelLeft, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useState } from "react";

interface NavbarProps {
  isDiscoveryOpen: boolean;
  onToggleDiscovery: () => void;
}

export default function Navbar({ isDiscoveryOpen, onToggleDiscovery }: NavbarProps) {
  const [showAbout, setShowAbout] = useState(false);

  const handleHeaderClick = () => {
    const event = new CustomEvent('show-welcome-modal');
    window.dispatchEvent(event);
  };

  return (
    <>
      <div className="absolute top-4 left-4 right-4 z-[1000] flex justify-center pointer-events-none">
        <div className="bg-background/60 backdrop-blur-2xl border border-border/50 shadow-2xl rounded-xl p-2 flex items-center justify-between w-full pointer-events-auto">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleDiscovery}
              className={`h-10 w-10 rounded-lg hover:bg-background/40 transition-colors ${isDiscoveryOpen ? 'bg-background/40 text-primary' : 'text-muted-foreground'}`}
            >
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Panel</span>
            </Button>
          </div>

          <div
            className="flex items-center gap-3 px-2 cursor-pointer group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            onClick={handleHeaderClick}
          >
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Coffee className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-serif text-foreground leading-none">Lewisburg&nbsp;Coffee&nbsp;Map</h1>
              <p className="text-xs text-muted-foreground font-serif mt-0.5">Find&nbsp;your&nbsp;perfect&nbsp;brew</p>
            </div>
          </div>

          <div className="w-10" /> {/* Spacer to balance the toggle button */}
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
