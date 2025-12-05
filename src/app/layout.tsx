import "~/styles/globals.css";

import { type Metadata } from "next";
import { PT_Serif } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Lewisburg Coffee Map",
  description: "Interactive map of coffee shops in Lewisburg, PA",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
