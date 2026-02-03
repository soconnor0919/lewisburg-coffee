import { X, MapPin, Globe, Phone, Coffee, ExternalLink, Search, ChevronRight, ChevronLeft, Navigation, Heart } from "lucide-react";
import Image from "next/image";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { Input } from "~/components/ui/input";
import { useState, useEffect } from "react";
import { type CoffeeShop } from "~/lib/data";

interface DrawerProps {
    shop: CoffeeShop | null;
    shops: CoffeeShop[];
    onSelect: (shop: CoffeeShop) => void;
    onClose: () => void;
    isOpen: boolean;
    onToggleOpen?: () => void;
}

export default function Drawer({ shop, shops, onSelect, onClose, isOpen, onToggleOpen }: DrawerProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [imageLoading, setImageLoading] = useState(true);
    const [activeShop, setActiveShop] = useState<CoffeeShop | null>(shop);
    const [favorites, setFavorites] = useState<Set<number>>(new Set());

    // Load favorites from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('lewisburg-coffee-favorites');
        if (saved) {
            try {
                setFavorites(new Set(JSON.parse(saved)));
            } catch (e) {
                console.error("Failed to parse favorites", e);
            }
        }
    }, []);

    // Save favorites to local storage whenever they change
    const toggleFavorite = (id: number, e?: React.MouseEvent) => {
        e?.stopPropagation();
        const newFavorites = new Set(favorites);
        if (newFavorites.has(id)) {
            newFavorites.delete(id);
        } else {
            newFavorites.add(id);
        }
        setFavorites(newFavorites);
        localStorage.setItem('lewisburg-coffee-favorites', JSON.stringify(Array.from(newFavorites)));
    };

    // Update activeShop when shop changes, but only if it's not null
    useEffect(() => {
        if (shop) {
            setActiveShop(shop);
            setImageLoading(true);
        }
    }, [shop]);

    const filteredShops = shops.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const favoriteShops = filteredShops.filter(s => favorites.has(s.id));
    const otherShops = filteredShops.filter(s => !favorites.has(s.id));

    const FADE_BOTTOM_STYLE = {
        maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
    };

    return (
        <div
            className={`absolute top-20 left-0 h-[calc(100dvh-6rem)] w-full sm:w-[400px] z-30 px-4 pt-3 pointer-events-none transition-transform duration-300 ease-in-out ${isOpen || shop ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <Card className="h-full w-full bg-glass-background backdrop-blur-xl border-glass-border overflow-hidden relative shadow-xl rounded-r-xl border-0 pointer-events-auto flex flex-col">
                {/* Details View */}
                <div
                    className={`absolute inset-0 z-20 transition-transform duration-300 ease-in-out bg-glass-background backdrop-blur-xl ${shop ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'}`}
                >
                    {activeShop && (
                        <div className="h-full flex flex-col relative">
                            <div className="absolute top-4 right-4 z-50 flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => toggleFavorite(activeShop.id, e)}
                                    className="bg-glass-background hover:bg-glass-border text-glass-text-primary rounded-full h-8 w-8 backdrop-blur-md border border-glass-border"
                                >
                                    <Heart className={`w-4 h-4 ${favorites.has(activeShop.id) ? 'fill-red-500 text-red-500' : 'text-glass-text-primary'}`} />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClose}
                                    className="bg-glass-background hover:bg-glass-border text-glass-text-primary rounded-full h-8 w-8 backdrop-blur-md border border-glass-border"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        onClose();
                                        if (onToggleOpen) onToggleOpen();
                                    }}
                                    className="bg-glass-background hover:bg-glass-border text-glass-text-primary rounded-full h-8 w-8 backdrop-blur-md border border-glass-border"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            <ScrollArea className="flex-1 min-h-0">
                                {/* Header Image - Now part of scroll area */}
                                <div className="h-64 relative w-full bg-muted/20">
                                    {imageLoading && (
                                        <div
                                            className="absolute inset-0 z-10 flex items-center justify-center"
                                            style={FADE_BOTTOM_STYLE}
                                        >
                                            <Skeleton className="h-full w-full absolute inset-0 bg-glass-border" />
                                            <Coffee className="h-12 w-12 text-glass-text-secondary/20 animate-pulse relative z-20" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src={activeShop.image}
                                            alt={activeShop.name}
                                            fill
                                            className={`object-cover transition-opacity duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                                            onLoad={() => setImageLoading(false)}
                                            style={FADE_BOTTOM_STYLE}
                                            sizes="(max-width: 640px) 100vw, 400px"
                                        />
                                    </div>
                                </div>

                                {/* Content - Overlaps image slightly or just follows */}
                                <div className="px-6 pb-20 space-y-6 pt-6">
                                    <div>
                                        <h2 className="text-3xl font-bold font-serif mb-2 text-glass-text-primary leading-tight">{activeShop.name}</h2>
                                        <div className="flex items-start gap-2 text-glass-text-secondary mb-4">
                                            <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-amber-500" />
                                            <p className="text-sm leading-relaxed">{activeShop.address}</p>
                                        </div>
                                        <p className="text-glass-text-primary leading-relaxed text-sm font-sans">
                                            {activeShop.description}
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <Button className="w-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 gap-2 font-medium" asChild>
                                            <a
                                                href={`https://www.google.com/maps/dir/?api=1&destination=${activeShop.lat},${activeShop.lng}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Navigation className="w-4 h-4" />
                                                Get Directions
                                            </a>
                                        </Button>
                                        <div className="grid grid-cols-2 gap-3">
                                            {activeShop.website && (
                                                <Button variant="outline" className="w-full border-glass-border text-glass-text-primary hover:bg-glass-border hover:text-glass-text-primary gap-2 text-xs" asChild>
                                                    <a href={activeShop.website} target="_blank" rel="noopener noreferrer">
                                                        <Globe className="w-3.5 h-3.5" />
                                                        Website
                                                    </a>
                                                </Button>
                                            )}
                                            {activeShop.phone && (
                                                <Button variant="outline" className="w-full border-glass-border text-glass-text-primary hover:bg-glass-border hover:text-glass-text-primary gap-2 text-xs" asChild>
                                                    <a href={`tel:${activeShop.phone}`}>
                                                        <Phone className="w-3.5 h-3.5" />
                                                        Call
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>
                        </div>
                    )}
                </div>

                {/* List View */}
                <div
                    className={`absolute inset-0 z-10 transition-all duration-300 ease-in-out flex flex-col h-full bg-transparent ${shop ? '-translate-x-1/4 opacity-0 pointer-events-none' : 'translate-x-0 opacity-100 pointer-events-auto'}`}
                >
                    <div className="px-6 pt-6 pb-4 bg-transparent shrink-0">
                        <h2 className="text-2xl font-bold font-serif mb-4 flex items-center gap-2 text-glass-text-primary">
                            <Coffee className="h-6 w-6 text-amber-500" />
                            Coffee Shops
                        </h2>
                        <div className="relative group">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-glass-text-secondary group-focus-within:text-amber-500 transition-colors" />
                            <Input
                                placeholder="Search coffee shops..."
                                className="pl-9 bg-glass-border border-glass-border text-glass-text-primary placeholder:text-glass-text-secondary focus-visible:ring-amber-500/50 hover:bg-glass-border/80 transition-colors"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <ScrollArea className="flex-1 min-h-0">
                        <div className="p-4 space-y-6">
                            {filteredShops.length === 0 ? (
                                <div className="text-center py-8 text-glass-text-secondary/60">
                                    <Coffee className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                    <p>No shops found matching "{searchQuery}"</p>
                                </div>
                            ) : (
                                <>
                                    {favoriteShops.length > 0 && (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 px-2 text-xs font-medium text-amber-500 uppercase tracking-wider">
                                                <Heart className="w-3 h-3 fill-amber-500" />
                                                Favorites
                                            </div>
                                            {favoriteShops.map((s) => (
                                                <ShopListItem key={s.id} shop={s} onSelect={onSelect} isFavorite={true} onToggleFavorite={toggleFavorite} />
                                            ))}
                                            <Separator className="bg-glass-border my-4" />
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        {favoriteShops.length > 0 && (
                                            <div className="flex items-center gap-2 px-2 text-xs font-medium text-glass-text-secondary uppercase tracking-wider">
                                                All Shops
                                            </div>
                                        )}
                                        {otherShops.map((s) => (
                                            <ShopListItem key={s.id} shop={s} onSelect={onSelect} isFavorite={false} onToggleFavorite={toggleFavorite} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </Card>
        </div>
    );
}

function ShopListItem({ shop, onSelect, isFavorite, onToggleFavorite }: { shop: CoffeeShop, onSelect: (s: CoffeeShop) => void, isFavorite: boolean, onToggleFavorite: (id: number, e: React.MouseEvent) => void }) {
    return (
        <div
            onClick={() => onSelect(shop)}
            className="group flex items-start gap-3 p-3 rounded-lg hover:bg-glass-border transition-all cursor-pointer border border-transparent hover:border-amber-500/20 active:scale-[0.99]"
        >
            <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 bg-glass-border relative shadow-sm">
                <Image
                    src={shop.image}
                    alt={shop.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="64px"
                />
                {isFavorite && (
                    <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-sm p-1 rounded-full">
                        <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold font-serif text-glass-text-primary text-base leading-tight group-hover:text-amber-500 transition-colors relative top-[-2px]">{shop.name}</h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 -mr-1 -mt-1 hover:bg-glass-border text-glass-text-secondary hover:text-red-500"
                        onClick={(e) => onToggleFavorite(shop.id, e)}
                    >
                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                </div>
                <p className="text-sm text-glass-text-secondary leading-snug group-hover:text-glass-text-primary transition-colors line-clamp-2">{shop.address}</p>
            </div>
        </div>
    );
}
