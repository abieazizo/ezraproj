"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/ui-custom/SectionHeader";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // How many cards visible at once
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateCount = () => setVisibleCount(getVisibleCount());
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    },
    [maxIndex]
  );

  // Autoplay
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, maxIndex]);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Testimonials"
          title="What Our Clients Say"
          subtitle="Trusted by hundreds of property buyers, sellers, and investors across the UAE."
        />

        {/* Carousel with arrows */}
        <div
          className="mt-12 relative group/carousel"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Left Arrow */}
          <button
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-brand-slate-400/30 bg-white/80 backdrop-blur-sm text-brand-navy transition-all duration-200 hover:bg-brand-navy hover:text-white hover:border-brand-navy",
              currentIndex === 0 && "opacity-30 cursor-not-allowed hover:bg-white/80 hover:text-brand-navy hover:border-brand-slate-400/30"
            )}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => goTo(currentIndex + 1)}
            disabled={currentIndex >= maxIndex}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-brand-slate-400/30 bg-white/80 backdrop-blur-sm text-brand-navy transition-all duration-200 hover:bg-brand-navy hover:text-white hover:border-brand-navy",
              currentIndex >= maxIndex && "opacity-30 cursor-not-allowed hover:bg-white/80 hover:text-brand-navy hover:border-brand-slate-400/30"
            )}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <div className="relative bg-white shadow-card rounded-xl p-8 h-full">
                  {/* Large quote mark */}
                  <span className="absolute top-4 left-4 text-brand-gold/15 font-display text-8xl leading-none select-none pointer-events-none">
                    &ldquo;
                  </span>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4 relative z-10">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < testimonial.rating
                            ? "fill-brand-gold text-brand-gold"
                            : "fill-gray-200 text-gray-200"
                        )}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="font-display italic text-brand-navy text-base leading-relaxed mb-6 relative z-10">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3 relative z-10">
                    <Image
                      src={testimonial.photo}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-brand-navy">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-brand-slate">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>

        {/* Dot Navigation */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                currentIndex === i
                  ? "bg-brand-gold w-6"
                  : "bg-brand-slate-400/40 hover:bg-brand-slate-400"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
