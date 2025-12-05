import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import { PT_Serif } from "next/font/google";

import { ThemeProvider } from "~/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Lewisburg Coffee Map",
  description: "Interactive map of coffee shops in Lewisburg, PA",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = {
  themeColor: "#8B4513",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-serif",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${ptSerif.variable}`} suppressHydrationWarning>
      <head>
        <script
          defer
          src="https://umami-iccw808w4wk088o0w4o8c8kg.coolify.soconnor.dev/script.js"
          data-website-id="415c64e5-98c5-4975-bf49-2c900fe6b1b5"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
