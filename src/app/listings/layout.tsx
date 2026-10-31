import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Listings",
  description:
    "Browse verified luxury properties for sale and rent across the UAE. Filter by type, price, bedrooms, and more. Find apartments, villas, penthouses, and commercial spaces.",
  openGraph: {
    title: "Property Listings | Shefa Real Estate",
    description:
      "Explore our curated collection of premium properties in Dubai and across the UAE.",
  },
};

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
