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
