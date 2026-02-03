"use client";

import { useState, useEffect } from "react";
import MapLoader from "~/components/MapLoader";
import Drawer from "~/components/Drawer";
import Navbar from "~/components/Navbar";
import { COFFEE_SHOPS, type CoffeeShop } from "~/lib/data";

import { WelcomeModal } from "~/components/WelcomeModal";

export default function HomePage() {
  const [selectedShop, setSelectedShop] = useState<CoffeeShop | null>(null);
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
      {/* Navbar - always visible */}
      <Navbar isDiscoveryOpen={isDiscoveryOpen} onToggleDiscovery={() => setIsDiscoveryOpen(!isDiscoveryOpen)} />

      {/* Right Drawer - only render after mount to prevent hydration mismatch */}
      {mounted && (
        <Drawer
          shop={selectedShop}
          shops={COFFEE_SHOPS}
          onSelect={setSelectedShop}
          onClose={() => {
            setSelectedShop(null);
            setIsDiscoveryOpen(true);
          }}
          isOpen={isDiscoveryOpen}
          onToggleOpen={() => setIsDiscoveryOpen(false)}
        />
      )}

      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <MapLoader
          shops={COFFEE_SHOPS}
          onShopSelect={(shop: typeof COFFEE_SHOPS[0]) => {
            setSelectedShop(shop);
          }}
          selectedShop={selectedShop}
          isDiscoveryOpen={isDiscoveryOpen}
        />
      </div>

      <WelcomeModal />
    </main>
  );
}
