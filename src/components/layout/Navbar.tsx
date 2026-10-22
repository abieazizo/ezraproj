"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Heart,
  ChevronDown,
  ChevronRight,
  Building2,
  Home,
  Castle,
  Landmark,
  HardHat,
  TreePine,
  Star,
  Flame,
  Map,
  BarChart3,
  Phone,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrolled";
import { useWishlist } from "@/hooks/useWishlist";

interface NavLink {
  label: string;
  href: string;
}

const mainLinks: NavLink[] = [
  { label: "Buy", href: "/listings?deal=sale" },
  { label: "Rent", href: "/listings?deal=rent" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const propertyTypes = [
  { label: "Apartments", href: "/listings?type=apartment", icon: Building2 },
  { label: "Villas", href: "/listings?type=villa", icon: Home },
  { label: "Penthouses", href: "/listings?type=penthouse", icon: Castle },
  { label: "Townhouses", href: "/listings?type=townhouse", icon: Landmark },
  { label: "Off-Plan", href: "/listings?badge=new", icon: HardHat },
  { label: "Land", href: "/listings?type=land", icon: TreePine },
];

const quickActions = [
  { label: "Featured Listings", href: "/listings?featured=true", icon: Star },
  { label: "Hot Deals", href: "/listings?badge=hot-deal", icon: Flame },
  { label: "Map Search", href: "/listings?view=map", icon: Map },
  { label: "Market Report", href: "/blog/dubai-real-estate-market-outlook-2025", icon: BarChart3 },
];

export default function Navbar() {
  const scrolled = useScrolled(50);
  const { count: wishlistCount } = useWishlist();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [mobilePropertiesOpen, setMobilePropertiesOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobilePropertiesOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleDropdownEnter = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setPropertiesOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setPropertiesOpen(false);
    }, 150);
  };

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("?")[0]);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-white shadow-md"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <div className="flex flex-col items-start">
                <span
                  className={cn(
                    "font-display font-bold text-2xl leading-none transition-colors duration-300",
                    scrolled ? "text-brand-navy" : "text-white"
                  )}
                >
                  SHEFA
                </span>
                <div className="h-0.5 w-10 bg-brand-gold my-1" />
                <span
                  className={cn(
                    "font-sans text-[10px] tracking-[0.35em] uppercase leading-none transition-colors duration-300",
                    scrolled ? "text-brand-navy" : "text-white"
                  )}
                >
                  Real Estate
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {/* Properties with Mega Dropdown */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-md",
                    scrolled
                      ? "text-brand-navy hover:text-brand-gold"
                      : "text-white/90 hover:text-white",
                    isActive("/listings") && !scrolled && "text-white",
                    isActive("/listings") && scrolled && "text-brand-gold"
                  )}
                >
                  Properties
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      propertiesOpen && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {propertiesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-2"
                    >
                      <div className="w-[480px] rounded-xl bg-white shadow-xl border border-gray-100 p-6">
                        <div className="grid grid-cols-2 gap-6">
                          {/* Property Types */}
                          <div>
                            <h4 className="text-xs font-semibold text-brand-slate uppercase tracking-wider mb-3">
                              Property Types
                            </h4>
                            <div className="space-y-1">
                              {propertyTypes.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-brand-navy hover:bg-brand-cream hover:text-brand-gold transition-colors group"
                                  onClick={() => setPropertiesOpen(false)}
                                >
                                  <item.icon className="h-4 w-4 text-brand-slate-400 group-hover:text-brand-gold transition-colors" />
                                  <span className="text-sm font-medium">
                                    {item.label}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div>
                            <h4 className="text-xs font-semibold text-brand-slate uppercase tracking-wider mb-3">
                              Quick Actions
                            </h4>
                            <div className="space-y-1">
                              {quickActions.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-brand-navy hover:bg-brand-cream hover:text-brand-gold transition-colors group"
                                  onClick={() => setPropertiesOpen(false)}
                                >
                                  <item.icon className="h-4 w-4 text-brand-slate-400 group-hover:text-brand-gold transition-colors" />
                                  <span className="text-sm font-medium">
                                    {item.label}
                                  </span>
                                </Link>
                              ))}
                            </div>

                            <div className="mt-6 p-4 rounded-lg bg-brand-cream">
                              <p className="text-xs text-brand-slate mb-2">
                                Looking to sell or rent?
                              </p>
                              <Link
                                href="/sell"
                                className="text-sm font-semibold text-brand-gold hover:text-brand-gold-400 transition-colors"
                                onClick={() => setPropertiesOpen(false)}
                              >
                                List Your Property &rarr;
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Nav Links */}
              {mainLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-md",
                    scrolled
                      ? "text-brand-navy hover:text-brand-gold"
                      : "text-white/90 hover:text-white",
                    isActive(link.href) && !scrolled && "text-white",
                    isActive(link.href) && scrolled && "text-brand-gold"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 transition-colors duration-300"
                aria-label="Wishlist"
              >
                <Heart
                  className={cn(
                    "h-5 w-5 transition-colors duration-300",
                    scrolled
                      ? "text-brand-navy hover:text-brand-gold"
                      : "text-white hover:text-brand-gold"
                  )}
                />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* List Your Property CTA */}
              <Link
                href="/sell"
                className={cn(
                  "px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300",
                  scrolled
                    ? "bg-brand-gold text-brand-navy hover:bg-brand-gold-400"
                    : "border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-navy"
                )}
              >
                List Your Property
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu
                className={cn(
                  "h-6 w-6 transition-colors duration-300",
                  scrolled ? "text-brand-navy" : "text-white"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 flex flex-col overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-col items-start"
                >
                  <span className="font-display font-bold text-xl text-brand-navy leading-none">
                    SHEFA
                  </span>
                  <div className="h-0.5 w-8 bg-brand-gold my-0.5" />
                  <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-brand-navy leading-none">
                    Real Estate
                  </span>
                </Link>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 -mr-2"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-brand-navy" />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 px-6 py-6 space-y-1">
                {/* Properties with Submenu */}
                <div>
                  <button
                    onClick={() =>
                      setMobilePropertiesOpen(!mobilePropertiesOpen)
                    }
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-3 text-base font-medium rounded-lg transition-colors",
                      isActive("/listings")
                        ? "text-brand-gold bg-brand-cream"
                        : "text-brand-navy hover:bg-brand-cream"
                    )}
                  >
                    Properties
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        mobilePropertiesOpen && "rotate-90"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {mobilePropertiesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 py-2 space-y-0.5">
                          {propertyTypes.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 text-sm text-brand-navy hover:text-brand-gold rounded-lg transition-colors"
                            >
                              <item.icon className="h-4 w-4 text-brand-slate-400" />
                              {item.label}
                            </Link>
                          ))}
                          <div className="border-t border-gray-100 mt-2 pt-2">
                            {quickActions.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 text-sm text-brand-navy hover:text-brand-gold rounded-lg transition-colors"
                              >
                                <item.icon className="h-4 w-4 text-brand-slate-400" />
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {mainLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-3 py-3 text-base font-medium rounded-lg transition-colors",
                      isActive(link.href)
                        ? "text-brand-gold bg-brand-cream"
                        : "text-brand-navy hover:bg-brand-cream"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Wishlist Link */}
                <Link
                  href="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-3 py-3 text-base font-medium text-brand-navy hover:bg-brand-cream rounded-lg transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Wishlist
                  </span>
                  {wishlistCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* List Property CTA */}
                <Link
                  href="/sell"
                  onClick={() => setMobileOpen(false)}
                  className="block mt-4 px-3 py-3 text-center text-base font-semibold bg-brand-gold text-brand-navy rounded-lg hover:bg-brand-gold-400 transition-colors"
                >
                  List Your Property
                </Link>
              </div>

              {/* Bottom Contact Section */}
              <div className="px-6 py-6 border-t border-gray-100 space-y-3">
                <a
                  href="tel:+971501234567"
                  className="flex items-center gap-3 text-sm text-brand-navy hover:text-brand-gold transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +971 50 123 4567
                </a>
                <a
                  href="https://wa.me/971501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BD5A] transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
