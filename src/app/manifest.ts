import { type MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Lewisburg Coffee Map',
        short_name: 'Coffee Map',
        description: 'Find the best coffee in Lewisburg, PA',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#8B4513',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/icon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            }
        ],
    };
}
