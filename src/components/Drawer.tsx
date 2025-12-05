import { X, MapPin, Coffee, Phone, Globe, ExternalLink } from "lucide-react";

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
            className={`absolute top-0 right-0 h-full w-full sm:w-[400px] bg-black/90 backdrop-blur-xl border-l border-white/10 z-30 transform transition-transform duration-300 ease-in-out shadow-2xl ${shop ? "translate-x-0" : "translate-x-full"
                }`}
        >
            {shop && (
                <div className="flex flex-col h-full text-white">
                    {/* Header Image */}
                    <div className="h-64 relative">
                        <img
                            src={shop.image}
                            alt={shop.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors backdrop-blur-md"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex-1 overflow-y-auto -mt-12 relative z-10">
                        <h2 className="text-4xl font-bold font-serif mb-4 text-[#D2691E] leading-tight">{shop.name}</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3 text-gray-300 font-sans text-sm">
                                <MapPin className="w-5 h-5 text-[#8B4513] flex-shrink-0 mt-0.5" />
                                <span>{shop.address}</span>
                            </div>
                            {shop.phone && (
                                <div className="flex items-center gap-3 text-gray-300 font-sans text-sm">
                                    <Phone className="w-5 h-5 text-[#8B4513] flex-shrink-0" />
                                    <a href={`tel:${shop.phone}`} className="hover:text-white transition-colors">{shop.phone}</a>
                                </div>
                            )}
                            {shop.website && (
                                <div className="flex items-center gap-3 text-gray-300 font-sans text-sm">
                                    <Globe className="w-5 h-5 text-[#8B4513] flex-shrink-0" />
                                    <a href={shop.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                                        Visit Website <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-200 font-serif">About</h3>
                                <p className="text-gray-300 leading-relaxed font-serif text-lg">
                                    {shop.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-white/10 bg-black/40">
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${shop.lat},${shop.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full py-4 bg-[#8B4513] hover:bg-[#A0522D] text-white font-bold rounded-xl transition-colors shadow-lg"
                        >
                            Get Directions
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
