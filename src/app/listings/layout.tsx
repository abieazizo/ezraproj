import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Listings",
  description:
    "Browse premium residential and commercial properties for sale and rent across the UAE. Filter by type, price, bedrooms, and more to find your perfect property.",
  openGraph: {
    title: "Property Listings | Shefa Real Estate",
    description:
      "Browse premium residential and commercial properties for sale and rent across the UAE.",
  },
};

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
