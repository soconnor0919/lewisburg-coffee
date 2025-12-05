"use client";

import { useState } from "react";
import MapLoader from "~/components/MapLoader";
import Navbar from "~/components/Navbar";
import Drawer from "~/components/Drawer";

const COFFEE_SHOPS = [
  { id: 1, name: "Amami Kitchen", description: "Italian espresso & fresh food.", lat: 40.9547, lng: -76.8841 },
  { id: 2, name: "Culture Coffee", description: "Specialty brews & matcha.", lat: 40.9660, lng: -76.8820 },
  { id: 3, name: "Bucknell 7th St Cafe", description: "Campus favorite.", lat: 40.9547, lng: -76.8837 },
  { id: 4, name: "Tastecraft Cafe", description: "Roastery & French macarons.", lat: 40.9635, lng: -76.8885 },
  { id: 5, name: "Paris Bakery", description: "Authentic pastries & coffee.", lat: 40.9645, lng: -76.8845 },
  { id: 6, name: "CycleUp Coffee", description: "Cycling themed cafe.", lat: 40.9640, lng: -76.8860 },
  { id: 7, name: "Cornerstone Kitchen", description: "Fresh eats at Miller Center.", lat: 40.9610, lng: -76.8970 },
  { id: 8, name: "Gram's Eatery", description: "Homestyle breakfast & coffee.", lat: 40.9642, lng: -76.8837 },
  { id: 9, name: "DC Coffee", description: "Gourmet coffee & atmosphere.", lat: 40.9650, lng: -76.8825 },
];

export default function Home() {
  const [selectedShop, setSelectedShop] = useState<typeof COFFEE_SHOPS[0] | null>(null);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white font-serif">
      <Navbar />

      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <MapLoader
          shops={COFFEE_SHOPS}
          onShopSelect={(shop: typeof COFFEE_SHOPS[0]) => setSelectedShop(shop)}
        />
      </div>

      {/* Right Drawer */}
      <Drawer
        shop={selectedShop}
        onClose={() => setSelectedShop(null)}
      />
    </main>
  );
}
