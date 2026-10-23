"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui-custom/SectionHeader";
import { listings } from "@/data/listings";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const neighborhoods = [
  {
    name: "Downtown Dubai",
    city: "Dubai",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&q=80",
  },
  {
    name: "Palm Jumeirah",
    city: "Dubai",
    image:
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&auto=format&q=80",
  },
  {
    name: "Dubai Marina",
    city: "Dubai",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&q=80",
  },
  {
    name: "Business Bay",
    city: "Dubai",
    image:
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=600&auto=format&q=80",
  },
  {
    name: "JVC",
    city: "Dubai",
    image:
      "https://images.unsplash.com/photo-1546412414-e1885259563a?w=600&auto=format&q=80",
  },
];

function getPropertyCount(neighborhoodName: string): number {
  const nameMap: Record<string, string[]> = {
    "Downtown Dubai": ["Downtown Dubai"],
    "Palm Jumeirah": ["Palm Jumeirah"],
    "Dubai Marina": ["Dubai Marina"],
    "Business Bay": ["Business Bay"],
    JVC: ["Jumeirah Village Circle", "JVC"],
  };
  const names = nameMap[neighborhoodName] || [neighborhoodName];
  return listings.filter((p) =>
    names.some(
      (n) => p.location.neighborhood.toLowerCase() === n.toLowerCase()
    )
  ).length;
}

export default function NeighborhoodGuide() {
  return (
    <section className="bg-brand-cream py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Neighborhoods"
          title="Explore Top Neighborhoods"
          action={{ label: "View All Areas", href: "/listings" }}
        />

        <motion.div
          className="mt-12 flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {neighborhoods.map((hood, i) => {
            const count = getPropertyCount(hood.name);
            return (
              <motion.div key={hood.name} variants={fadeInUp} custom={i} className="flex-shrink-0">
              <Link
                href={`/listings?city=${encodeURIComponent(hood.city)}`}
                className="group relative w-72 h-96 block rounded-xl overflow-hidden border-2 border-transparent hover:border-brand-gold transition-all duration-300"
              >
                <Image
                  src={hood.image}
                  alt={hood.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="288px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-brand-gold text-sm font-medium">
                    {hood.city}
                  </p>
                  <h3 className="font-display text-xl text-white font-semibold mt-1">
                    {hood.name}
                  </h3>
                  <span className="inline-block mt-3 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-medium">
                    {count} {count === 1 ? "Property" : "Properties"}
                  </span>
                </div>
              </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
