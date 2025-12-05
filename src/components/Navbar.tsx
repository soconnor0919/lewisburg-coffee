import { ArrowUp, Coffee, PanelLeft, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { useState, useEffect } from "react";

interface NavbarProps {
  isDiscoveryOpen: boolean;
  onToggleDiscovery: () => void;
}

export default function Navbar({ isDiscoveryOpen, onToggleDiscovery }: NavbarProps) {
  const [showAbout, setShowAbout] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(false);

  const handleHeaderClick = () => {
    const event = new CustomEvent('show-welcome-modal');
    window.dispatchEvent(event);
  };

  useEffect(() => {
    // Show tooltip hint on mobile for first-time users
    const hasSeenHint = localStorage.getItem('discovery-panel-hint-seen');
    const isMobile = window.innerWidth < 640;

    if (!hasSeenHint && isMobile) {
      setIsOnboarding(true);
      const timer = setTimeout(() => {
        setShowTooltip(true);
        // Auto-hide after 5 seconds
        setTimeout(() => {
          setShowTooltip(false);
          setIsOnboarding(false);
          localStorage.setItem('discovery-panel-hint-seen', 'true');
        }, 5000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <div className="absolute top-4 left-4 right-4 z-[1000] flex justify-center pointer-events-none">
        <div className="bg-background/60 backdrop-blur-2xl border border-border/50 shadow-2xl rounded-xl p-2 flex items-center justify-between w-full pointer-events-auto">
          <div className="flex items-center gap-2 relative">
            {/* Pulsing indicator ring - only during onboarding */}
            {isOnboarding && showTooltip && (
              <div className="absolute inset-0 rounded-lg animate-ping bg-primary/30 pointer-events-none" />
            )}
            <TooltipProvider>
              <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      onToggleDiscovery();
                      setShowTooltip(false);
                      setIsOnboarding(false);
                      localStorage.setItem('discovery-panel-hint-seen', 'true');
                    }}
                    className={`h-10 w-10 rounded-lg hover:bg-background/40 transition-colors ${isDiscoveryOpen ? 'bg-background/40 text-primary' : 'text-muted-foreground'}`}
                  >
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Panel</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-background/80 backdrop-blur-xl border-border/50 text-foreground font-semibold shadow-2xl">
                  <p>Discover Coffee Shops</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div
            className="flex items-center gap-3 px-2 cursor-pointer group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            onClick={handleHeaderClick}
          >
            <div className="p-2 rounded-lg group-hover:bg-primary/10 transition-colors">
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
          <div className="w-full max-w-md bg-background/80 backdrop-blur-2xl border border-border/50 text-foreground p-6 relative shadow-2xl rounded-xl">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAbout(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <Coffee className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold font-serif">Lewisburg Coffee Map</h2>
              <p className="text-muted-foreground font-serif leading-relaxed">
                Discover the best coffee spots in Lewisburg, PA. Click on any marker to learn more about each location,
                or use the discovery panel to browse and search all available shops.
              </p>

              <div className="w-full h-px bg-border/50 my-4" />

              <div className="text-xs text-muted-foreground space-y-2 font-sans w-full text-left">
                <p><strong>Features:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Interactive map with coffee shop locations</li>
                  <li>Search and filter coffee shops</li>
                  <li>Detailed information for each location</li>
                  <li>Get directions to any shop</li>
                  <li>Light/Dark theme support</li>
                </ul>
                <div className="pt-4 border-t border-border/50 mt-4">
                  <p>Map Data © <a href="https://www.openstreetmap.org/copyright" className="underline hover:text-foreground transition-colors">OpenStreetMap</a> contributors</p>
                  <p>Tiles © <a href="https://carto.com/attributions" className="underline hover:text-foreground transition-colors">CARTO</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
