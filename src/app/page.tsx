"use client";

import { useState, useEffect } from "react";
import MapLoader from "~/components/MapLoader";
import Drawer from "~/components/Drawer";
import Navbar from "~/components/Navbar";
import { COFFEE_SHOPS } from "~/lib/data";

import { WelcomeModal } from "~/components/WelcomeModal";

export default function HomePage() {
  const [selectedShop, setSelectedShop] = useState<typeof COFFEE_SHOPS[0] | null>(null);
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(true); // Default to true for SSR
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set based on viewport after mount
    const isMobile = window.innerWidth < 640; // sm breakpoint
    setIsDiscoveryOpen(!isMobile);
  }, []);

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-black text-white font-serif">
      {/* Unified shadow container for navbar + drawer */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-[1000]" style={{ boxShadow: 'inset 0 0 40px 10px rgb(0 0 0 / 0.3)' }}>
        {/* Navbar - always visible */}
        <Navbar isDiscoveryOpen={isDiscoveryOpen} onToggleDiscovery={() => setIsDiscoveryOpen(!isDiscoveryOpen)} />

        {/* Right Drawer - only render after mount to prevent hydration mismatch */}
        {mounted && (
          <Drawer
            shop={selectedShop}
            shops={COFFEE_SHOPS}
            onSelect={setSelectedShop}
            onClose={() => setSelectedShop(null)}
            isOpen={isDiscoveryOpen}
            onToggleOpen={() => setIsDiscoveryOpen(false)}
          />
        )}
      </div>

      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <MapLoader
          shops={COFFEE_SHOPS}
          onShopSelect={(shop: typeof COFFEE_SHOPS[0]) => {
            setSelectedShop(shop);
          }}
          selectedShop={selectedShop}
        />
      </div>

      <WelcomeModal />
    </main>
  );
}
