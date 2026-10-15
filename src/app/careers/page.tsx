import Link from "next/link";
import { TrendingUp, Users, Globe, MapPin, Clock, ArrowRight } from "lucide-react";
import { generatePageMeta } from "@/lib/metadata";

export const metadata = generatePageMeta(
  "Careers",
  "Join the Shefa Real Estate team in Dubai. Explore open positions in real estate, marketing, and photography. Build your career with one of Dubai's leading property consultancies."
);

const valueProps = [
  {
    icon: TrendingUp,
    title: "Growth",
    description:
      "We invest in your professional development with RERA certification support, advanced training programs, and clear pathways to leadership roles. Our top performers consistently grow into senior positions within two years.",
  },
  {
    icon: Users,
    title: "Culture",
    description:
      "Join a diverse, collaborative team of professionals from over 15 nationalities. We celebrate wins together, support each other through challenges, and maintain a work environment built on mutual respect and shared purpose.",
  },
  {
    icon: Globe,
    title: "Impact",
    description:
      "Help families find their dream home, guide investors toward smart decisions, and shape Dubai's real estate landscape. Every transaction you facilitate changes someone's life for the better.",
  },
];

const openPositions = [
  {
    title: "Senior Real Estate Agent",
    type: "Full-time",
    location: "Dubai",
    description:
      "Lead client relationships and manage end-to-end property transactions in Dubai's premium residential market. You will work with high-net-worth buyers and sellers, conduct market analyses, and negotiate deals across luxury communities including Palm Jumeirah, Downtown, and Dubai Hills Estate. Requires a valid RERA broker card and a minimum of 3 years of experience in Dubai real estate.",
  },
  {
    title: "Digital Marketing Manager",
    type: "Full-time",
    location: "Dubai",
    description:
      "Own our digital marketing strategy across all channels, from SEO and paid advertising to social media and email campaigns. You will drive qualified leads to our agents, manage a six-figure annual ad budget, and produce compelling content that positions Shefa as a thought leader in the Dubai property market. Experience in real estate or luxury brand marketing is strongly preferred.",
  },
  {
    title: "Property Photographer",
    type: "Freelance",
    location: "Dubai",
    description:
      "Capture stunning photography and video content for our property listings across Dubai. You will shoot interiors, exteriors, and aerial drone footage for luxury residential and commercial properties, delivering edited assets that meet our brand standards. Must have a professional portfolio, your own equipment, and availability for 10 to 15 shoots per month.",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Mini Hero */}
      <section className="relative bg-brand-navy py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Careers</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white">
            Careers at Shefa
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">
            Build your career with one of Dubai&apos;s most respected real
            estate consultancies. We are always looking for talented, driven
            professionals to join our growing team.
          </p>
        </div>
      </section>

      {/* Why Work at Shefa */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-brand-gold uppercase tracking-[0.15em] text-xs font-sans font-semibold mb-3">
              Why Join Us
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy">
              Why Work at Shefa
            </h2>
            <div className="w-10 h-[3px] bg-brand-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((prop) => {
              const Icon = prop.icon;
              return (
                <div
                  key={prop.title}
                  className="bg-brand-cream rounded-xl p-8 text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-brand-gold" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-brand-navy mb-3">
                    {prop.title}
                  </h3>
                  <p className="text-brand-slate text-sm leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 md:py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-brand-gold uppercase tracking-[0.15em] text-xs font-sans font-semibold mb-3">
              Open Roles
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy">
              Current Openings
            </h2>
            <div className="w-10 h-[3px] bg-brand-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {openPositions.map((position) => (
              <div
                key={position.title}
                className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-lg transition-shadow duration-300 flex flex-col"
              >
                <h3 className="font-display text-xl font-bold text-brand-navy mb-3">
                  {position.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="flex items-center gap-1.5 text-sm text-brand-slate">
                    <Clock className="w-4 h-4 text-brand-gold" />
                    {position.type}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-brand-slate">
                    <MapPin className="w-4 h-4 text-brand-gold" />
                    {position.location}
                  </span>
                </div>
                <p className="text-brand-slate text-sm leading-relaxed flex-1">
                  {position.description}
                </p>
                <div className="mt-6">
                  <Link
                    href="/contact?inquiry=careers"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-navy text-white text-sm font-semibold hover:bg-brand-navy-800 transition-colors"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-brand-slate text-sm">
              Don&apos;t see a role that fits?{" "}
              <Link
                href="/contact?inquiry=careers"
                className="text-brand-gold font-semibold hover:underline"
              >
                Send us your CV
              </Link>{" "}
              and we&apos;ll keep you in mind for future opportunities.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
