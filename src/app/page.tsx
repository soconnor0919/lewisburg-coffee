"use client";

import { useState, useEffect } from "react";
import MapLoader from "~/components/MapLoader";
import Drawer from "~/components/Drawer";
import Navbar from "~/components/Navbar";
import { COFFEE_SHOPS } from "~/lib/data";

import { WelcomeModal } from "~/components/WelcomeModal";

export default function HomePage() {
  const [selectedShop, setSelectedShop] = useState<typeof COFFEE_SHOPS[0] | null>(null);
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(true);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Hide discovery panel on mobile initially
    const isMobile = window.innerWidth < 640; // sm breakpoint
    setIsDiscoveryOpen(!isMobile);

    // Mark map as loaded after a short delay
    const timer = setTimeout(() => setIsMapLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-black text-white font-serif">
      {/* Navbar - always visible */}
      <Navbar isDiscoveryOpen={isDiscoveryOpen} onToggleDiscovery={() => setIsDiscoveryOpen(!isDiscoveryOpen)} />

      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <MapLoader
          shops={COFFEE_SHOPS}
          onShopSelect={(shop: typeof COFFEE_SHOPS[0]) => {
            setSelectedShop(shop);
            setIsDiscoveryOpen(true);
          }}
          selectedShop={selectedShop}
        />
      </div>

      {/* Right Drawer - only show after map loads */}
      {isMapLoaded && (
        <Drawer
          shop={selectedShop}
          shops={COFFEE_SHOPS}
          onSelect={setSelectedShop}
          onClose={() => setSelectedShop(null)}
          isOpen={isDiscoveryOpen}
        />
      )}
      <WelcomeModal />
    </main>
  );
}
