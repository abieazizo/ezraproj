"use client";

import { useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import SectionHeader from "@/components/ui-custom/SectionHeader";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export default function TestimonialsSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Testimonials"
          title="What Our Clients Say"
          subtitle="Trusted by hundreds of property buyers, sellers, and investors across the UAE."
        />

        <div className="mt-12 relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-brand-navy hover:text-brand-gold hover:shadow-card-lg transition-all duration-200 hidden lg:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-brand-navy hover:text-brand-gold hover:shadow-card-lg transition-all duration-200 hidden lg:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <Swiper
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{
              clickable: true,
              bulletClass: "inline-block w-2.5 h-2.5 rounded-full bg-brand-slate-400/40 mx-1 cursor-pointer transition-all duration-300",
              bulletActiveClass: "!bg-brand-gold !w-6",
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="relative bg-white shadow-card rounded-xl p-8 h-full">
                  <span className="absolute top-4 left-4 text-brand-gold/15 font-display text-8xl leading-none select-none pointer-events-none">
                    &ldquo;
                  </span>

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

                  <blockquote className="font-display italic text-brand-navy text-base leading-relaxed mb-6 relative z-10">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>

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
                        {testimonial.role} &middot; {testimonial.propertyType}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
