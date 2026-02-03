# Lewisburg Coffee Map

A modern, interactive map application to discover the best coffee spots in Lewisburg, PA. Built with the T3 Stack, featuring a premium glassmorphic UI, dynamic theming, and accurate geolocation data.

## Features

### Interactive Map
- **15+ Locations**: Verified coordinates for local cafes and major chains.
- **Custom Markers**: Glassmorphic coffee cup icons.
- **Map Styles**: Switch between **Dark**, **Light**, and **Satellite** views.
- **Smart Zoom**: Smooth controls and "Home" reset button.

### Premium UI/UX
- **Glassmorphism**: "Liquid Glass" aesthetic with `backdrop-blur` and translucent backgrounds.
- **Dynamic Theming**:
  - **Map-Driven**: Changing the map style automatically updates the entire app's theme.
  - **System Sync**: Respects your device's Dark/Light mode preference on load.
- **Responsive Design**: Full mobile support with a slide-out drawer for shop details.

###  Rich Data
- **Detailed Info**: Photos, addresses, phone numbers, and websites for every shop.
- **Direct Navigation**: "Get Directions" button links directly to Google Maps.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) (v4)
- **Map Engine**: [React Leaflet](https://react-leaflet.js.org) & [Leaflet](https://leafletjs.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)
- **UI Components**: [Radix UI](https://www.radix-ui.com) (Dialog, Dropdown, etc.)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Runtime**: [Bun](https://bun.sh)

## Getting Started

### Prerequisites
- [Bun](https://bun.sh) (v1.0+)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/lewisburg-coffee.git
   cd lewisburg-coffee
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Run the development server:
   ```bash
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

To create a production build:

```bash
bun run build
bun start
```

## License

GPLv3
