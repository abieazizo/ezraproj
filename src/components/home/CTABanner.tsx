import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-gold-shimmer animate-shimmer bg-[length:200%_100%]">
      {/* Diagonal stripe overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(10,22,40,1) 10px, rgba(10,22,40,1) 12px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Left: headline + subtext */}
          <div className="text-center md:text-left">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-3">
              Ready to Make Your Move?
            </h2>
            <p className="text-brand-navy/70 text-lg max-w-lg">
              Whether you&apos;re buying, selling, or renting, our team of experts
              is here to guide you every step of the way.
            </p>
          </div>

          {/* Right: two buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <Link
              href="/listings"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-brand-navy text-white font-semibold text-sm hover:-translate-y-0.5 hover:shadow-card-lg transition-all duration-200 w-full sm:w-auto"
            >
              Browse All Properties
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border-2 border-brand-navy text-brand-navy font-semibold text-sm hover:bg-brand-navy hover:text-white transition-all duration-200 w-full sm:w-auto"
            >
              Talk to an Agent
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
