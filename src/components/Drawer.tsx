import { X, MapPin, Globe, Phone, Coffee, ExternalLink, Search, ChevronRight } from "lucide-react";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { Input } from "~/components/ui/input";
import { useState, useEffect } from "react";

interface CoffeeShop {
    id: number;
    name: string;
    description: string;
    image: string;
    address: string;
    phone: string;
    website: string;
    lat: number;
    lng: number;
}

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

    // Reset loading state when shop changes
    useEffect(() => {
        if (shop) {
            setImageLoading(true);
        }
    }, [shop]);

    const filteredShops = shops.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div
            className={`absolute top-20 left-0 h-[calc(100dvh-6rem)] w-full sm:w-[400px] z-30 p-4 pointer-events-none transition-transform duration-300 ease-in-out ${isOpen || shop ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <Card className="h-full w-full bg-background/40 backdrop-blur-2xl border-border/50 shadow-2xl overflow-hidden flex flex-col gap-0 pointer-events-auto rounded-xl p-0 border-0 transition-all duration-300">
                {shop ? (
                    // Details View
                    // Details View
                    <div className="h-full flex flex-col relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 bg-background/20 hover:bg-background/40 text-foreground rounded-full h-8 w-8 backdrop-blur-md border border-border/50"
                        >
                            <X className="w-4 h-4" />
                        </Button>

                        <ScrollArea className="flex-1 min-h-0">
                            {/* Header Image - Now part of scroll area */}
                            <div className="h-64 relative w-full bg-muted/20">
                                {imageLoading && (
                                    <div
                                        className="absolute inset-0 z-10 flex items-center justify-center"
                                        style={{
                                            maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                                            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
                                        }}
                                    >
                                        <Skeleton className="h-full w-full absolute inset-0" />
                                        <Coffee className="h-12 w-12 text-muted-foreground/50 animate-pulse relative z-20" />
                                    </div>
                                )}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={shop.image}
                                        alt={shop.name}
                                        className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                                        onLoad={() => setImageLoading(false)}
                                        style={{
                                            maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                                            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Content - Overlaps image slightly or just follows */}
                            <div className="p-8 -mt-12 relative z-10">
                                <h2 className="text-3xl font-bold font-serif mb-4 text-primary leading-tight drop-shadow-md">{shop.name}</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-3 text-muted-foreground font-serif text-sm">
                                        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span>{shop.address}</span>
                                    </div>
                                    {shop.phone && (
                                        <div className="flex items-center gap-3 text-muted-foreground font-serif text-sm">
                                            <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                                            <a href={`tel:${shop.phone}`} className="hover:text-foreground transition-colors">{shop.phone}</a>
                                        </div>
                                    )}
                                    {shop.website && (
                                        <div className="flex items-center gap-3 text-muted-foreground font-serif text-sm">
                                            <Globe className="w-5 h-5 text-primary flex-shrink-0" />
                                            <a href={shop.website} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
                                                Visit Website <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <Separator className="bg-border/50 mb-6" />

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-foreground font-serif">About</h3>
                                        <p className="text-muted-foreground leading-relaxed font-serif text-lg">
                                            {shop.description}
                                        </p>
                                    </div>

                                    <Button
                                        asChild
                                        size="sm"
                                        className="w-auto px-6 bg-primary/20 hover:bg-primary/40 text-foreground font-semibold rounded-lg shadow-lg transition-all hover:scale-[1.02] border border-primary/50 backdrop-blur-md"
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
                    </div>
                ) : (
                    // List View
                    <div className="flex flex-col h-full">
                        <div className="p-4 border-b border-border/50 bg-background/40 backdrop-blur-md relative">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onToggleOpen}
                                className="absolute top-4 right-4 bg-background/20 hover:bg-background/40 text-foreground rounded-full h-8 w-8 backdrop-blur-md border border-border/50"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                            <h2 className="text-xl font-bold font-serif mb-4 text-primary">Discover Coffee</h2>
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search shops..."
                                    className="pl-9 bg-background/50 border-border/50 focus:bg-background transition-colors"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <ScrollArea className="flex-1 min-h-0">
                            <div className="p-4 space-y-3">
                                {filteredShops.map((s) => (
                                    <div
                                        key={s.id}
                                        onClick={() => onSelect(s)}
                                        className="group flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border/50"
                                    >
                                        <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 bg-muted relative">
                                            <img src={s.image} alt={s.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold font-serif text-foreground truncate group-hover:text-primary transition-colors">{s.name}</h3>
                                            <p className="text-sm text-muted-foreground truncate">{s.address}</p>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                ))}
                                {filteredShops.length === 0 && (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <Coffee className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                        <p>No shops found matching "{searchQuery}"</p>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                )}
            </Card>
        </div>
    );
}
