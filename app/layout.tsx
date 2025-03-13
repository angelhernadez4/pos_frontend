import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from './providers'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "POS",
  description: "Point of Sale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.className} bg-gray-200 dark:bg-gray-900`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
