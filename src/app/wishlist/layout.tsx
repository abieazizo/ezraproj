import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist",
  description:
    "Your saved properties on Shefa Real Estate. Compare and revisit your favourite listings.",
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
