"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui-custom/SectionHeader";
import { listings } from "@/data/listings";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const typeImages: Record<string, string> = {
  Apartments:
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&auto=format&q=80",
  Villas:
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&auto=format&q=80",
  Penthouses:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&auto=format&q=80",
  Townhouses:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&q=80",
  Commercial:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&q=80",
  Land:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&q=80",
};

const typeToSlug: Record<string, string> = {
  Apartments: "apartment",
  Villas: "villa",
  Penthouses: "penthouse",
  Townhouses: "townhouse",
  Commercial: "office",
  Land: "land",
};

const typeNames = [
  "Apartments",
  "Villas",
  "Penthouses",
  "Townhouses",
  "Commercial",
  "Land",
];

function getCountForType(typeName: string): number {
  const slug = typeToSlug[typeName];
  if (slug === "office") {
    return listings.filter(
      (p) => p.type === "office" || p.type === "retail"
    ).length;
  }
  return listings.filter((p) => p.type === slug).length;
}

export default function ExploreByType() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Explore"
          title="Browse by Property Type"
        />

        <motion.div
          className="mt-12 flex gap-4 overflow-x-auto pb-4 scrollbar-hide md:justify-center md:flex-wrap"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {typeNames.map((name, i) => {
            const count = getCountForType(name);
            return (
              <motion.div key={name} variants={fadeInUp} custom={i} className="flex-shrink-0">
              <Link
                href={`/listings?type=${typeToSlug[name]}`}
                className="group relative w-44 h-56 block rounded-xl overflow-hidden"
              >
                <Image
                  src={typeImages[name]}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="176px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-display text-lg font-semibold">
                    {name}
                  </h3>
                  <p className="text-brand-gold text-xs mt-0.5">
                    {count} {count === 1 ? "Property" : "Properties"}
                  </p>
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
