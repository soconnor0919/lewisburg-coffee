import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import { PT_Serif } from "next/font/google";

import { ThemeProvider } from "~/components/ThemeProvider";
import { env } from "~/env";

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
        {/* only load analytics on production */}
        {process.env.NODE_ENV === "production" && (
          <script
            defer
            src={env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
            data-website-id={env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 flex justify-end p-4">
            <div className="pointer-events-auto rounded-xl border border-white/20 bg-black/20 px-4 py-2 text-xs text-white/80 shadow-lg backdrop-blur-md transition-opacity hover:opacity-100">
              © 2026 Sean O'Connor. All Rights Reserved.
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
