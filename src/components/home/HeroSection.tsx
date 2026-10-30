"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Building, ChevronDown, Search, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const propertyTypes = [
  "All Types",
  "Apartment",
  "Villa",
  "Penthouse",
  "Townhouse",
  "Office",
  "Land",
  "Retail",
];

const particles = [
  { top: "15%", left: "10%", delay: "0s", size: "w-1.5 h-1.5" },
  { top: "25%", left: "85%", delay: "0.5s", size: "w-2 h-2" },
  { top: "60%", left: "20%", delay: "1s", size: "w-1 h-1" },
  { top: "45%", left: "75%", delay: "1.5s", size: "w-2 h-2" },
  { top: "70%", left: "50%", delay: "2s", size: "w-1.5 h-1.5" },
  { top: "35%", left: "40%", delay: "0.8s", size: "w-1 h-1" },
];

export default function HeroSection() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("All Types");
  const [dealType, setDealType] = useState<"sale" | "rent">("sale");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const opacity = Math.max(0, 1 - window.scrollY / 300);
      setScrollOpacity(opacity);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location.trim()) params.set("city", location.trim());
    if (type !== "All Types") params.set("type", type.toLowerCase());
    params.set("dealType", dealType);
    if (minPrice.trim()) params.set("minPrice", minPrice.trim());
    if (maxPrice.trim()) params.set("maxPrice", maxPrice.trim());
    router.push(`/listings?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="relative h-svh w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&auto=format&q=80"
        alt="Luxury property exterior"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Floating gold particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full bg-brand-gold opacity-30 animate-float",
            p.size
          )}
          style={{
            top: p.top,
            left: p.left,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow */}
          <p
            className="text-brand-gold text-sm tracking-widest uppercase mb-6 animate-fadeInUp"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            Welcome to Shefa Real Estate
          </p>

          {/* H1 */}
          <h1
            className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fadeInUp"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <span className="text-white">Find Your Dream</span>
            <br />
            <span className="text-brand-gold">Property Today</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-white/80 text-lg max-w-xl mx-auto mb-10 animate-fadeInUp"
            style={{ animationDelay: "0.5s", animationFillMode: "both" }}
          >
            Discover premium residential and commercial properties across the
            UAE&apos;s most sought-after locations.
          </p>
        </div>

        {/* Search Bar */}
        <div
          className="w-full max-w-3xl mx-auto animate-fadeInUp"
          style={{ animationDelay: "0.7s", animationFillMode: "both" }}
        >
          <div className="bg-white rounded-xl shadow-card-lg p-1.5">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
              {/* Location Field */}
              <div className="flex items-center gap-2.5 px-4 py-2.5 flex-1 min-w-0">
                <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <label className="text-[10px] font-semibold text-brand-slate uppercase tracking-wider">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="City, neighborhood..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="text-sm text-brand-navy placeholder:text-brand-slate-400 bg-transparent outline-none w-full"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px bg-brand-navy/10 self-stretch my-2" />

              {/* Type Field */}
              <div className="flex items-center gap-2.5 px-4 py-2.5 flex-1 min-w-0">
                <Building className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <label className="text-[10px] font-semibold text-brand-slate uppercase tracking-wider">
                    Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="text-sm text-brand-navy bg-transparent outline-none cursor-pointer w-full appearance-none"
                  >
                    {propertyTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px bg-brand-navy/10 self-stretch my-2" />

              {/* Deal Type Toggle */}
              <div className="flex items-center gap-1.5 px-4 py-2.5">
                <button
                  onClick={() => setDealType("sale")}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    dealType === "sale"
                      ? "bg-brand-navy text-white"
                      : "text-brand-slate hover:bg-gray-100"
                  )}
                >
                  For Sale
                </button>
                <button
                  onClick={() => setDealType("rent")}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    dealType === "rent"
                      ? "bg-brand-navy text-white"
                      : "text-brand-slate hover:bg-gray-100"
                  )}
                >
                  For Rent
                </button>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px bg-brand-navy/10 self-stretch my-2" />

              {/* Budget Field */}
              <div className="flex items-center gap-2.5 px-4 py-2.5">
                <DollarSign className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <label className="text-[10px] font-semibold text-brand-slate uppercase tracking-wider">
                    Budget
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value.replace(/[^0-9]/g, ""))}
                      onKeyDown={handleKeyDown}
                      className="w-20 text-sm text-brand-navy placeholder:text-brand-slate-400 bg-transparent outline-none"
                    />
                    <span className="text-brand-slate-400 text-xs">–</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value.replace(/[^0-9]/g, ""))}
                      onKeyDown={handleKeyDown}
                      className="w-20 text-sm text-brand-navy placeholder:text-brand-slate-400 bg-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-brand-gold text-brand-navy font-semibold px-8 py-3 rounded-lg hover:-translate-y-0.5 hover:shadow-gold transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ opacity: scrollOpacity }}
      >
        <span className="text-white/60 text-xs tracking-wider uppercase">
          Scroll to explore
        </span>
        <ChevronDown className="w-5 h-5 text-white/60 animate-bounce" />
      </div>
    </section>
  );
}
