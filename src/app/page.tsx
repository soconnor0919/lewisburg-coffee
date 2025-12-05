"use client";

import { useState } from "react";
import MapLoader from "~/components/MapLoader";
import Drawer from "~/components/Drawer";
import { COFFEE_SHOPS } from "~/lib/data";

import { WelcomeModal } from "~/components/WelcomeModal";

export default function HomePage() {
  const [selectedShop, setSelectedShop] = useState<typeof COFFEE_SHOPS[0] | null>(null);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white font-serif">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <MapLoader
          shops={COFFEE_SHOPS}
          onShopSelect={(shop: typeof COFFEE_SHOPS[0]) => setSelectedShop(shop)}
          selectedShop={selectedShop}
        />
      </div>

      {/* Right Drawer */}
      <Drawer
        shop={selectedShop}
        onClose={() => setSelectedShop(null)}
      />
      <WelcomeModal />
    </main>
  );
}
