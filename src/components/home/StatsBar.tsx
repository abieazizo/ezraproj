"use client";

import AnimatedCounter from "@/components/ui-custom/AnimatedCounter";

const stats = [
  { end: 500, suffix: "+", label: "Properties Listed" },
  { end: 12, suffix: "+", label: "Years of Experience" },
  { end: 1200, suffix: "+", label: "Happy Clients" },
  { end: 2, prefix: "AED ", suffix: "B+", label: "Total Deals Closed" },
];

export default function StatsBar() {
  return (
    <section className="bg-brand-navy py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center justify-center">
              {/* Divider (desktop only, not before first) */}
              {i > 0 && (
                <div className="hidden md:block w-px h-14 bg-white/10 mr-8" />
              )}
              <div className="text-center">
                <AnimatedCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  className="font-display text-4xl text-brand-gold font-bold"
                />
                <p className="text-xs text-white/60 uppercase tracking-widest mt-2">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
