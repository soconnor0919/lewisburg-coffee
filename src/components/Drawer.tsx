import { X, MapPin, Globe, Phone, Coffee, ExternalLink } from "lucide-react";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { useState, useEffect } from "react";

interface DrawerProps {
    shop: {
        id: number;
        name: string;
        description: string;
        image: string;
        address: string;
        phone: string;
        website: string;
        lat: number;
        lng: number;
    } | null;
    onClose: () => void;
}

export default function Drawer({ shop, onClose }: DrawerProps) {
    const [imageLoading, setImageLoading] = useState(true);

    // Reset loading state when shop changes
    useEffect(() => {
        if (shop) {
            setImageLoading(true);
        }
    }, [shop]);

    if (!shop) return null;

    return (
        <div
            className={`absolute top-20 left-0 h-[calc(100vh-6rem)] w-full sm:w-[400px] z-30 transform transition-transform duration-300 ease-in-out p-4 pointer-events-none ${shop ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            {shop && (
                <Card className="h-full w-full bg-background/60 backdrop-blur-2xl border-border/50 shadow-2xl overflow-hidden flex flex-col gap-0 pointer-events-auto rounded-xl p-0 border-0">
                    {/* Header Image */}
                    <div className="h-56 relative flex-shrink-0 bg-muted/20">
                        {imageLoading && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center">
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

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="absolute top-4 right-4 bg-background/20 hover:bg-background/40 text-foreground rounded-full h-8 w-8 backdrop-blur-md border border-border/50"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Content */}
                    <ScrollArea className="flex-1 -mt-12 relative z-10 min-h-0">
                        <div className="p-8">
                            <h2 className="text-3xl font-bold font-serif mb-4 text-primary leading-tight">{shop.name}</h2>

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
                </Card>
            )}
        </div>
    );
}
