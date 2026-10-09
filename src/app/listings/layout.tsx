import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Listings",
  description:
    "Browse premium apartments, villas, penthouses, and commercial properties for sale and rent across Dubai and the UAE. Filter by price, location, bedrooms, and more.",
  openGraph: {
    title: "Property Listings | Shefa Real Estate",
    description:
      "Browse premium properties for sale and rent across Dubai and the UAE.",
  },
};

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
