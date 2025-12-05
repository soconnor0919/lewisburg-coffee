import "~/styles/globals.css";

import { type Metadata } from "next";
import { Lora } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Lewisburg Coffee Map",
  description: "A guide to coffee in Lewisburg, PA",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${lora.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
