import Link from "next/link";
import { Shield, Trophy, Briefcase, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Listings",
    description:
      "Every property is personally inspected and verified by our team to ensure accuracy, authenticity, and compliance with RERA standards.",
  },
  {
    icon: Trophy,
    title: "Award-Winning Agency",
    description:
      "Recognized as a top-performing brokerage in the UAE, with multiple industry awards for excellence in client service and market expertise.",
  },
  {
    icon: Briefcase,
    title: "Expert Agents",
    description:
      "Our multilingual agents bring decades of combined experience, offering tailored guidance for buyers, sellers, landlords, and tenants.",
  },
  {
    icon: Lock,
    title: "Secure Transactions",
    description:
      "We handle every transaction with full transparency, escrow protection, and legal oversight to safeguard your investment at every step.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-navy py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left Column - 40% */}
          <div className="lg:col-span-2">
            <span className="text-brand-gold uppercase tracking-[0.15em] text-xs font-sans font-semibold">
              Why Choose Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
              The Trusted Name in UAE Real Estate
            </h2>
            <div className="w-10 h-[3px] bg-brand-gold mt-4 mb-6" />
            <p className="text-white/70 text-base leading-relaxed">
              With over a decade of experience navigating the UAE property
              market, Shefa Real Estate has earned the trust of thousands of
              clients. We combine deep local knowledge with global standards of
              professionalism to deliver results that exceed expectations, every
              time.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-lg border border-brand-gold text-brand-gold font-semibold text-sm hover:bg-brand-gold hover:text-brand-navy transition-all duration-300"
            >
              Learn About Us
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Right Column - 60% */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-brand-navy-800 rounded-xl p-7 hover:bg-brand-navy-700 transition-colors duration-300"
                >
                  <Icon className="w-7 h-7 text-brand-gold mb-4" />
                  <h3 className="text-white text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
