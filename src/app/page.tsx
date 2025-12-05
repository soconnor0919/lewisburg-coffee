"use client";

import { useState } from "react";
import MapLoader from "~/components/MapLoader";
import Navbar from "~/components/Navbar";
import Drawer from "~/components/Drawer";

const COFFEE_SHOPS = [
  {
    id: 1,
    name: "Amami Kitchen",
    description: "A beloved culinary spot offering a blend of high-quality Italian espresso and American coffee bar options, alongside mouthwatering baked goods and paninis.",
    lat: 40.9547,
    lng: -76.8841,
    address: "103 S 6th St, Lewisburg, PA 17837",
    phone: "(570) 490-7857",
    website: "https://www.amamiespresso.com",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Culture Coffee",
    description: "A modern coffee shop focusing on unique brewing methods for specialty coffee and traditional techniques for matcha. Known for its 'Red Velvet Latte' and croissants.",
    lat: 40.9660,
    lng: -76.8820,
    address: "216 St. John St, Lewisburg, PA 17837",
    phone: "(570) 601-7903",
    website: "https://www.instagram.com/culturecoffeee_",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Bucknell 7th St Cafe",
    description: "Bucknell's ultimate on-campus dessert and coffee shop. A cozy spot for students and visitors to enjoy milkshakes, ice cream, and specialty espresso drinks.",
    lat: 40.9547,
    lng: -76.8837,
    address: "420 S 7th St, Lewisburg, PA 17837",
    phone: "(570) 577-1240",
    website: "https://www.bucknell.edu/life-bucknell/dining-services/places-eat",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Tastecraft Cafe",
    description: "Downtown cafe known for its in-house roasted coffee and over 20 flavors of French macarons. A perfect spot to relax with a fresh brew and a sweet treat.",
    lat: 40.9635,
    lng: -76.8885,
    address: "512 Market St, Lewisburg, PA 17837",
    phone: "(570) 768-5340",
    website: "https://www.tastecraftcafe.com",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Paris Bakery",
    description: "Authentic French bakery offering legendary croissants, pain au chocolat, and artisanal breads. Experience a taste of France in the heart of Lewisburg.",
    lat: 40.9645,
    lng: -76.8845,
    address: "335 Market St, Lewisburg, PA 17837",
    phone: "(570) 884-2138",
    website: "https://parisbakery.cafe",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "CycleUp Coffee",
    description: "A unique bike shop cafe serving as a community hub. Enjoy coffee, light bites, and bike services in a cozy, cycling-themed atmosphere.",
    lat: 40.9640,
    lng: -76.8860,
    address: "429 Market St, Lewisburg, PA 17837",
    phone: "(570) 413-1705",
    website: "https://www.cycleupcafe.com",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Cornerstone Kitchen",
    description: "Located in the Miller Center, offering fresh, healthy, and delicious cafe food. A place to connect over real food and a shared table.",
    lat: 40.9610,
    lng: -76.8970,
    address: "120 Hardwood Dr, Lewisburg, PA 17837",
    phone: "(570) 556-4191",
    website: "https://millercenterlewisburg.com/cornerstone-kitchen",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Gram's Eatery",
    description: "A local favorite for homestyle breakfast and brunch. Known for generous portions, locally sourced ingredients, and a welcoming atmosphere.",
    lat: 40.9642,
    lng: -76.8837,
    address: "21 N 3rd St, Lewisburg, PA 17837",
    phone: "(570) 522-0230",
    website: "https://www.facebook.com/gramseaterylewisburg",
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 9,
    name: "DC Coffee",
    description: "Charming cafe offering gourmet coffee, lattes, and a full breakfast and lunch menu. A cozy spot with a friendly, hometown feel.",
    lat: 40.9650,
    lng: -76.8825,
    address: "235 Market St, Lewisburg, PA 17837",
    phone: "(570) 966-6400",
    website: "https://dccoffeeandteacafe.com",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop"
  },
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
