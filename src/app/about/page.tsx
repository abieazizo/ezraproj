import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Lightbulb,
  Award,
  Heart,
  Phone,
  Mail,
  Star,
  Globe,
  Building,
  ArrowRight,
} from "lucide-react";
import SectionHeader from "@/components/ui-custom/SectionHeader";
import { agents } from "@/data/agents";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Shefa Real Estate, Dubai's trusted property consultancy. Discover our story, values, and the expert team behind over AED 2 billion in successful transactions.",
  openGraph: {
    title: "About Shefa Real Estate",
    description:
      "Dubai's trusted property consultancy. Over 12 years of expertise, 1,200+ satisfied clients, and AED 2B+ in transactions.",
  },
};

const stats = [
  { value: "500+", label: "Properties Sold & Leased" },
  { value: "12+", label: "Years of Experience" },
  { value: "1,200+", label: "Happy Clients" },
  { value: "AED 2B+", label: "In Closed Deals" },
];

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We operate with complete transparency. Every listing is verified, every valuation is data-backed, and every agreement is reviewed by our legal team. Our reputation is built on trust, and we protect it with every transaction.",
  },
  {
    icon: Award,
    title: "Expertise",
    description:
      "Our agents hold RERA certifications, advanced real estate qualifications, and deep neighborhood-level knowledge. We invest in continuous training so our team stays ahead of market shifts and regulatory changes.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "From virtual property tours and AI-powered valuations to our proprietary market analytics dashboard, we leverage technology to give our clients a competitive edge in one of the world's most dynamic property markets.",
  },
  {
    icon: Heart,
    title: "Client-First",
    description:
      "Your goals are our priority. Whether you are a first-time buyer, a seasoned investor, or a family relocating to Dubai, we tailor every interaction to your unique needs. Our success is measured by yours.",
  },
];

const certifications = [
  "RERA Certified Brokerage",
  "Dubai Land Department Registered",
  "Dubai Chamber of Commerce Member",
  "FIABCI International Real Estate Federation",
  "UAE Real Estate Alliance Partner",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1600&auto=format&q=80"
          alt="Shefa Real Estate team in office"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-brand-gold uppercase tracking-[0.2em] text-sm font-semibold mb-4">
            Who We Are
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white">
            About Shefa Real Estate
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Left Image */}
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&q=80"
                  alt="Shefa Real Estate office"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full md:w-1/2 space-y-6">
              <span className="text-brand-gold uppercase tracking-[0.15em] text-xs font-sans font-semibold">
                Est. 2012
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy">
                Built on Trust.
                <br />
                Driven by Results.
              </h2>
              <div className="w-10 h-[3px] bg-brand-gold" />

              <p className="text-brand-slate text-lg leading-relaxed">
                Shefa Real Estate was founded in 2012 with a singular vision: to
                bring a new standard of professionalism, transparency, and
                client-centric service to the Dubai property market. What began
                as a boutique consultancy with three agents and a shared passion
                for real estate has grown into one of the emirate&apos;s most
                respected brokerages.
              </p>
              <p className="text-brand-slate text-lg leading-relaxed">
                Over the past twelve years, we have helped more than 1,200
                families, investors, and businesses find the right property at
                the right price. Our team of six senior consultants brings
                combined experience spanning luxury residential, commercial
                leasing, off-plan investment, and property management across
                every major Dubai community.
              </p>
              <p className="text-brand-slate text-lg leading-relaxed">
                We believe that buying, selling, or renting a property should be
                one of life&apos;s most rewarding experiences, not one of its
                most stressful. That is why we invest heavily in technology,
                training, and processes that remove friction and empower our
                clients to make confident, informed decisions every step of the
                way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-brand-navy py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-brand-gold">
                  {stat.value}
                </p>
                <p className="text-white/70 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="What Guides Us"
            title="Our Core Values"
            subtitle="Four principles that inform every decision we make, every property we list, and every client relationship we build."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-brand-navy mb-2">
                    {value.title}
                  </h3>
                  <p className="text-brand-slate text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="The People Behind the Brand"
            title="Meet the Team"
            subtitle="Six senior consultants, each a specialist in their domain, united by a commitment to exceptional client outcomes."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-lg transition-all duration-300"
              >
                {/* Photo */}
                <div className="relative h-[280px]">
                  <Image
                    src={agent.photo}
                    alt={agent.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-brand-navy">
                      {agent.name}
                    </h3>
                    <p className="text-brand-gold text-sm font-semibold">
                      {agent.title}
                    </p>
                  </div>

                  {/* Languages */}
                  <div className="flex items-center gap-2 text-sm text-brand-slate">
                    <Globe className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    <span>{agent.languages.join(", ")}</span>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5">
                    {agent.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="px-2.5 py-0.5 rounded-full bg-brand-cream text-brand-navy text-xs font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center gap-4 text-xs text-brand-slate">
                    <span className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5" />
                      {agent.listings} Listings
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-brand-gold" />
                      {agent.rating} ({agent.reviews} reviews)
                    </span>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Link
                      href={`tel:${agent.phone}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-brand-navy text-white text-sm font-medium hover:bg-brand-navy-800 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call
                    </Link>
                    <Link
                      href={`mailto:${agent.email}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-brand-navy text-brand-navy text-sm font-medium hover:bg-brand-cream transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Email
                    </Link>
                    <a
                      href={agent.linkedin || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-lg border border-brand-navy text-brand-navy hover:bg-brand-cream transition-colors"
                      aria-label={`${agent.name} on LinkedIn`}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  </div>

                  {/* View Listings */}
                  <Link
                    href={`/listings?agent=${agent.id}`}
                    className="flex items-center justify-center gap-1.5 text-sm font-semibold text-brand-gold hover:text-brand-gold-400 transition-colors pt-1"
                  >
                    View Listings
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-brand-slate text-sm font-semibold uppercase tracking-wider mb-6">
            Certifications & Memberships
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="text-brand-navy/60 text-sm font-medium whitespace-nowrap"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
