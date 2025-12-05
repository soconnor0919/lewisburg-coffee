import { X, MapPin, Phone, Globe, ExternalLink } from "lucide-react";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";

interface CoffeeShop {
    id: number;
    name: string;
    description: string;
    lat: number;
    lng: number;
    address: string;
    phone: string;
    website: string;
    image: string;
}

interface DrawerProps {
    shop: CoffeeShop | null;
    onClose: () => void;
}

export default function Drawer({ shop, onClose }: DrawerProps) {
    return (
        <div
            className={`absolute top-20 left-0 h-[calc(100vh-6rem)] w-full sm:w-[400px] z-30 transform transition-transform duration-300 ease-in-out p-4 pointer-events-none ${shop ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            {shop && (
                <Card className="h-full w-full bg-black/60 backdrop-blur-2xl border-white/10 shadow-2xl overflow-hidden flex flex-col gap-0 pointer-events-auto rounded-xl p-0 border-0">
                    {/* Header Image */}
                    <div className="h-56 relative flex-shrink-0">
                        <img
                            src={shop.image}
                            alt={shop.name}
                            className="w-full h-full object-cover"
                        />
                        {/* Top Fade/Shadow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
                        {/* Bottom Fade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full h-8 w-8 backdrop-blur-md border border-white/10"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Content */}
                    <ScrollArea className="flex-1 -mt-12 relative z-10 min-h-0">
                        <div className="p-8">
                            <h2 className="text-3xl font-bold font-serif mb-4 text-[#D2691E] leading-tight">{shop.name}</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3 text-gray-300 font-serif text-sm">
                                    <MapPin className="w-5 h-5 text-[#8B4513] flex-shrink-0 mt-0.5" />
                                    <span>{shop.address}</span>
                                </div>
                                {shop.phone && (
                                    <div className="flex items-center gap-3 text-gray-300 font-serif text-sm">
                                        <Phone className="w-5 h-5 text-[#8B4513] flex-shrink-0" />
                                        <a href={`tel:${shop.phone}`} className="hover:text-white transition-colors">{shop.phone}</a>
                                    </div>
                                )}
                                {shop.website && (
                                    <div className="flex items-center gap-3 text-gray-300 font-serif text-sm">
                                        <Globe className="w-5 h-5 text-[#8B4513] flex-shrink-0" />
                                        <a href={shop.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                                            Visit Website <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                )}
                            </div>

                            <Separator className="bg-white/10 mb-6" />

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-200 font-serif">About</h3>
                                    <p className="text-gray-300 leading-relaxed font-serif text-lg">
                                        {shop.description}
                                    </p>
                                </div>

                                <Button
                                    asChild
                                    size="sm"
                                    className="w-auto px-6 bg-[#8B4513]/20 hover:bg-[#8B4513]/40 text-white font-semibold rounded-lg shadow-lg transition-all hover:scale-[1.02] border border-[#8B4513]/50 backdrop-blur-md"
                                >
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${shop.lat},${shop.lng}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Get Directions
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </ScrollArea>
                </Card>
            )}
        </div>
    );
}
