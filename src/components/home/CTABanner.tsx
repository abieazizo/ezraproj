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

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4">
          Ready to Make Your Move?
        </h2>
        <p className="text-brand-navy/70 text-lg max-w-xl mx-auto mb-8">
          Whether you&apos;re buying, selling, or renting, our team of experts
          is here to guide you every step of the way.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/listings"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-brand-navy text-white font-semibold text-sm hover:-translate-y-0.5 hover:shadow-card-lg transition-all duration-200"
          >
            Browse All Properties
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border-2 border-brand-navy text-brand-navy font-semibold text-sm hover:bg-brand-navy hover:text-white transition-all duration-200"
          >
            Talk to an Agent
          </Link>
        </div>
      </div>
    </section>
  );
}
