import { X, MapPin, Coffee } from "lucide-react";

interface CoffeeShop {
    id: number;
    name: string;
    description: string;
    lat: number;
    lng: number;
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
                    {/* Header Image Placeholder */}
                    <div className="h-64 bg-gradient-to-br from-[#8B4513] to-black relative flex items-center justify-center">
                        <Coffee className="w-24 h-24 text-white/20" />
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex-1 overflow-y-auto">
                        <h2 className="text-4xl font-bold font-serif mb-2 text-[#D2691E]">{shop.name}</h2>
                        <div className="flex items-center gap-2 text-gray-400 mb-6 font-sans text-sm">
                            <MapPin className="w-4 h-4" />
                            <span>{shop.lat.toFixed(4)}, {shop.lng.toFixed(4)}</span>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-200">About</h3>
                                <p className="text-gray-300 leading-relaxed font-serif text-lg">
                                    {shop.description}
                                </p>
                            </div>

                            {/* Placeholder for more details */}
                            <div className="pt-6 border-t border-white/10">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-lg text-center">
                                        <span className="block text-2xl mb-1">☕</span>
                                        <span className="text-xs text-gray-400 uppercase tracking-wider">Coffee</span>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-lg text-center">
                                        <span className="block text-2xl mb-1">🥐</span>
                                        <span className="text-xs text-gray-400 uppercase tracking-wider">Pastries</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-white/10 bg-black/40">
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${shop.lat},${shop.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full py-4 bg-[#8B4513] hover:bg-[#A0522D] text-white font-bold rounded-xl transition-colors"
                        >
                            Get Directions
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
