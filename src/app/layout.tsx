import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingElements from "@/components/layout/FloatingElements";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shefa Real Estate",
    template: "%s | Shefa Real Estate",
  },
  description:
    "Premium real estate agency offering luxury residential and commercial properties across the UAE. Discover verified listings, expert guidance, and seamless transactions with Shefa Real Estate.",
  metadataBase: new URL("https://shefa.ae"),
  openGraph: {
    type: "website",
    siteName: "Shefa Real Estate",
    locale: "en_AE",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingElements />
      </body>
    </html>
  );
}
