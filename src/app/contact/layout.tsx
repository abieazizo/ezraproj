import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Shefa Real Estate. Visit our Business Bay office, call, WhatsApp, or send us a message. Our team responds within 2 business hours.",
  openGraph: {
    title: "Contact Shefa Real Estate",
    description:
      "Visit our Business Bay office, call, WhatsApp, or send us a message. Our team responds within 2 business hours.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
