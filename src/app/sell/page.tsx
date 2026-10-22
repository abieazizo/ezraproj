import type { Metadata } from "next";
import Image from "next/image";
import {
  ClipboardCheck,
  Megaphone,
  Users,
  Handshake,
  PartyPopper,
  Zap,
  TrendingUp,
  Heart,
  Star,
} from "lucide-react";
import SectionHeader from "@/components/ui-custom/SectionHeader";
import ValuationForm from "./ValuationForm";
import SellFAQ from "./SellFAQ";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Sell Your Property",
  description:
    "Sell your Dubai property with confidence. Free valuations, strategic marketing, expert negotiation, and seamless closing with Shefa Real Estate.",
  openGraph: {
    title: "Sell Your Property | Shefa Real Estate",
    description:
      "Sell your Dubai property with confidence. Free valuations, strategic marketing, and expert negotiation.",
  },
};

const steps = [
  {
    icon: ClipboardCheck,
    title: "Free Valuation",
    description:
      "Our certified valuers analyze comparable sales, current market conditions, and your property's unique features to determine its optimal listing price.",
  },
  {
    icon: Megaphone,
    title: "Strategic Marketing",
    description:
      "Professional photography, virtual tours, targeted digital campaigns, and exposure across 30+ property portals to reach qualified buyers locally and internationally.",
  },
  {
    icon: Users,
    title: "Qualified Viewings",
    description:
      "We pre-screen every prospective buyer to ensure they are financially qualified and genuinely interested, so your time is never wasted on unproductive viewings.",
  },
  {
    icon: Handshake,
    title: "Expert Negotiation",
    description:
      "Our experienced negotiators work to secure the best possible price and terms, drawing on deep market knowledge and proven closing strategies.",
  },
  {
    icon: PartyPopper,
    title: "Seamless Closing",
    description:
      "From MOU to DLD transfer, we manage every document, coordinate with banks and legal teams, and ensure a smooth handover with no surprises.",
  },
];

const advantages = [
  {
    icon: Zap,
    title: "Faster Sales",
    stat: "30 Days Average",
    description:
      "Our targeted marketing and pre-qualified buyer network mean properties listed with Shefa sell in an average of 30 days, compared to the market average of 60-90 days.",
  },
  {
    icon: TrendingUp,
    title: "Higher Prices",
    stat: "8% Above Average",
    description:
      "Data-driven pricing, professional staging, and expert negotiation consistently deliver final sale prices 5-10% higher than owner-listed properties in the same community.",
  },
  {
    icon: Heart,
    title: "Less Stress",
    stat: "End-to-End Service",
    description:
      "From initial valuation to final key handover, a dedicated transaction manager handles every detail so you can focus on what matters most to you.",
  },
];

export default function SellPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&q=80"
          alt="Luxury property for sale"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-brand-gold uppercase tracking-[0.2em] text-sm font-semibold mb-4">
            Sell with Shefa
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            Sell Your Property with Confidence
          </h1>
          <p className="text-white/80 text-lg">
            Maximum value, minimum hassle. Let our experts handle every detail.
          </p>
        </div>
      </section>

      {/* How It Works - Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            eyebrow="The Process"
            title="How It Works"
            subtitle="Five clear steps from listing to sold. We keep you informed at every stage."
          />

          <div className="mt-14 relative">
            {/* Vertical timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-brand-cream-200" />

            <div className="space-y-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative flex gap-6 md:gap-8">
                    {/* Step number circle */}
                    <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-navy flex items-center justify-center shadow-lg">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-brand-gold" />
                    </div>

                    {/* Content */}
                    <div className="pt-1 pb-2">
                      <span className="text-brand-gold text-xs font-semibold uppercase tracking-wider">
                        Step {index + 1}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-brand-navy mt-1">
                        {step.title}
                      </h3>
                      <p className="text-brand-slate mt-2 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Free Valuation Form */}
      <section className="py-20 bg-brand-gold/10">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader
            eyebrow="Get Started"
            title="Request a Free Valuation"
            subtitle="Fill in your property details and one of our valuers will contact you within 2 hours with a comprehensive market assessment."
          />
          <div className="mt-10">
            <ValuationForm />
          </div>
        </div>
      </section>

      {/* Why Sell with Shefa */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="The Shefa Difference"
            title="Why Sell With Shefa"
            subtitle="Results that speak for themselves."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((adv) => {
              const Icon = adv.icon;
              return (
                <div
                  key={adv.title}
                  className="bg-brand-cream rounded-xl p-8 text-center hover:shadow-card-lg transition-shadow duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-white mx-auto flex items-center justify-center mb-4 shadow-card">
                    <Icon className="w-7 h-7 text-brand-gold" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-brand-navy mb-1">
                    {adv.title}
                  </h3>
                  <p className="text-brand-gold font-semibold text-sm mb-3">
                    {adv.stat}
                  </p>
                  <p className="text-brand-slate text-sm leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seller Testimonials */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader
            eyebrow="Success Stories"
            title="What Our Sellers Say"
            subtitle="Real outcomes from real clients who trusted Shefa to sell their properties."
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials
              .filter(
                (t) =>
                  t.role.toLowerCase().includes("seller") ||
                  t.role.toLowerCase().includes("investor")
              )
              .slice(0, 2)
              .map((t) => (
                <div
                  key={t.id}
                  className="relative flex gap-5 bg-white rounded-xl p-6 shadow-card"
                >
                  <Image
                    src={t.photo}
                    alt={t.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover w-16 h-16 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-0.5 mb-2">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-brand-gold text-brand-gold"
                        />
                      ))}
                    </div>
                    <p className="text-brand-navy text-sm leading-relaxed line-clamp-4 mb-3">
                      &ldquo;{t.content}&rdquo;
                    </p>
                    <p className="text-sm font-semibold text-brand-navy">
                      {t.name}
                    </p>
                    <p className="text-xs text-brand-slate">
                      {t.role} &middot; {t.location}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader
            eyebrow="Common Questions"
            title="Selling FAQ"
            subtitle="Answers to the questions sellers ask us most."
          />
          <div className="mt-10">
            <SellFAQ />
          </div>
        </div>
      </section>
    </>
  );
}
