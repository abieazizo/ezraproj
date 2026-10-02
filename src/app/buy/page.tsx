import type { Metadata } from "next";
import Image from "next/image";
import { Home, Shield, TrendingUp } from "lucide-react";
import SectionHeader from "@/components/ui-custom/SectionHeader";
import { listings } from "@/data/listings";
import BuyListingsGrid from "./BuyListingsGrid";

export const metadata: Metadata = {
  title: "Buy Property in Dubai",
  description:
    "Browse premium properties for sale across Dubai. Luxury villas, penthouses, apartments, and townhouses from Shefa Real Estate.",
  openGraph: {
    title: "Buy Property in Dubai | Shefa Real Estate",
    description:
      "Browse premium properties for sale across Dubai. Luxury villas, penthouses, apartments, and townhouses.",
  },
};

const saleListings = listings.filter((p) => p.dealType === "sale");

const reasons = [
  {
    icon: Shield,
    title: "RERA-Certified Expertise",
    description:
      "Every Shefa agent holds a valid RERA broker license and undergoes continuous professional development. We adhere to the highest ethical standards mandated by the Dubai Land Department, ensuring your purchase is fully compliant and transparent from the first viewing to final registration.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&q=80",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Pricing",
    description:
      "Our proprietary market analytics engine draws on live DLD transaction data, comparable sales, and neighborhood-level supply metrics to determine the true market value of every property. You will never overpay, because our recommendations are backed by numbers, not guesswork.",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&auto=format&q=80",
  },
  {
    icon: Home,
    title: "End-to-End Support",
    description:
      "From mortgage pre-approval coordination with leading UAE banks, to legal review, DLD registration, and post-purchase handover inspections, Shefa manages every step so you can focus on choosing the home you love. Our dedicated transaction managers ensure nothing is missed.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&q=80",
  },
];

export default function BuyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&auto=format&q=80"
          alt="Luxury villa in Dubai"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-brand-gold uppercase tracking-[0.2em] text-sm font-semibold mb-4">
            Properties for Sale
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            Find Your Perfect Home to Buy
          </h1>
          <p className="text-white/80 text-lg">
            {saleListings.length} premium properties available across Dubai
          </p>
        </div>
      </section>

      {/* Why Buy with Shefa */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="The Shefa Advantage"
            title="Why Buy with Shefa?"
            subtitle="We combine market intelligence, legal expertise, and personalized service to deliver a buying experience that is as rewarding as the property itself."
          />

          <div className="mt-16 space-y-20">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              const isReversed = index % 2 !== 0;

              return (
                <div
                  key={reason.title}
                  className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} gap-10 items-center`}
                >
                  {/* Image */}
                  <div className="w-full md:w-1/2">
                    <div className="relative h-[320px] md:h-[400px] rounded-2xl overflow-hidden">
                      <Image
                        src={reason.image}
                        alt={reason.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-1/2 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brand-gold" />
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-brand-navy">
                      {reason.title}
                    </h3>
                    <p className="text-brand-slate text-lg leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Listings Grid with Filters */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Browse Listings"
            title="Properties for Sale"
            subtitle="Explore our curated collection of premium properties available for purchase in Dubai."
          />
          <div className="mt-12">
            <BuyListingsGrid />
          </div>
        </div>
      </section>
    </>
  );
}
