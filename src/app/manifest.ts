import { type MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
    return {
        name: 'Lewisburg Coffee Map',
        short_name: 'Coffee Map',
        description: 'Find the best coffee in Lewisburg, PA',
        start_url: `${basePath}/`,
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#8B4513',
        icons: [
            {
                src: `${basePath}/favicon.ico`,
                sizes: 'any',
                type: 'image/x-icon',
            }
        ],
    };
}
