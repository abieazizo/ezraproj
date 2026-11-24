import Link from "next/link";
import SectionHeader from "@/components/ui-custom/SectionHeader";
import PlaceholderImage from "@/components/ui-custom/PlaceholderImage";
import { listings } from "@/data/listings";

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

        <div className="mt-12 flex gap-4 overflow-x-auto pb-4 scrollbar-hide md:justify-center md:flex-wrap">
          {typeNames.map((name) => {
            const count = getCountForType(name);
            return (
              <Link
                key={name}
                href={`/listings?type=${typeToSlug[name]}`}
                className="group relative w-44 h-56 flex-shrink-0 rounded-xl overflow-hidden"
              >
                <PlaceholderImage
                  variant="property"
                  seed={`type-${name}`}
                  fill
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-white font-display text-lg font-semibold">
                    {name}
                  </h3>
                  <p className="text-brand-gold text-xs mt-0.5">
                    {count} {count === 1 ? "Property" : "Properties"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
