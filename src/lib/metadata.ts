import { Metadata } from "next";
import type { Property } from "@/types";

const SITE_NAME = "Shefa Real Estate";
const SITE_URL = "https://shefa.ae";

export function generatePropertyMeta(property: Property): Metadata {
  const beds =
    property.specs.bedrooms === 0
      ? "Studio"
      : `${property.specs.bedrooms}BR`;

  const title = `${beds} ${property.type.charAt(0).toUpperCase() + property.type.slice(1)} in ${property.location.neighborhood} | ${SITE_NAME}`;

  const description =
    property.description.length > 155
      ? property.description.substring(0, 152) + "..."
      : property.description;

  const keywords = [
    property.type,
    property.dealType === "sale" ? "buy" : "rent",
    property.location.neighborhood,
    property.location.city,
    property.location.country,
    ...property.amenities.slice(0, 5),
    "real estate",
    "property",
  ].join(", ");

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: property.coverImage,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
      type: "website",
      siteName: SITE_NAME,
      url: `${SITE_URL}/listings/${property.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [property.coverImage],
    },
  };
}

export function generatePageMeta(
  page: string,
  description: string
): Metadata {
  const title = `${page} | ${SITE_NAME}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: SITE_NAME,
      url: SITE_URL,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
