"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/about#team" },
  { label: "Sell Property", href: "/sell" },
  { label: "Blog", href: "/blog" },
  { label: "Market Reports", href: "/blog?category=Market+Trends" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Contact", href: "/contact" },
];

const propertyLinks = [
  { label: "Apartments for Sale", href: "/listings?type=apartment&dealType=sale" },
  { label: "Villas for Sale", href: "/listings?type=villa&dealType=sale" },
  { label: "Penthouses", href: "/listings?type=penthouse" },
  { label: "Townhouses", href: "/listings?type=townhouse" },
  { label: "Commercial", href: "/listings?type=office" },
  { label: "Land Plots", href: "/listings?type=land" },
  { label: "Featured", href: "/listings?featured=true" },
  { label: "New Listings", href: "/listings?badge=new" },
];

interface SocialLink {
  href: string;
  label: string;
  path: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://instagram.com/shefarealestate",
    label: "Instagram",
    path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  },
  {
    href: "https://facebook.com/shefarealestate",
    label: "Facebook",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    href: "https://linkedin.com/company/shefarealestate",
    label: "LinkedIn",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
  },
  {
    href: "https://youtube.com/@shefarealestate",
    label: "YouTube",
    path: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z",
  },
  {
    href: "https://twitter.com/shefarealestate",
    label: "Twitter",
    path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
  },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Sitemap", href: "/sitemap" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy">
      {/* Newsletter Strip */}
      <div className="bg-brand-navy-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-2xl text-white mb-2">
                Stay Ahead of the Market
              </h3>
              <p className="text-white/60 text-sm max-w-md">
                Get exclusive listings and market insights delivered weekly
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
            >
              <div className="relative flex-1 w-full">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-brand-gold text-brand-navy font-semibold text-sm rounded-lg hover:bg-brand-gold-400 transition-colors shrink-0"
              >
                <Send className="h-4 w-4" />
                Subscribe
              </button>
            </form>
          </div>
          <p className="text-white/30 text-xs text-center lg:text-left mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="flex flex-col items-start">
                <span className="font-display font-bold text-2xl text-white leading-none">
                  SHEFA
                </span>
                <div className="h-0.5 w-10 bg-brand-gold my-1" />
                <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-white leading-none">
                  Real Estate
                </span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Shefa Real Estate is your trusted partner for premium property
              solutions across the UAE. With decades of market expertise, we
              deliver exceptional service, curated listings, and seamless
              transactions for discerning clients.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white/70 hover:bg-brand-gold hover:text-brand-navy transition-all duration-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display text-lg text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Properties */}
          <div>
            <h4 className="font-display text-lg text-white mb-6">
              Properties
            </h4>
            <ul className="space-y-3">
              {propertyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-display text-lg text-white mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <span className="text-sm text-white/70 leading-relaxed">
                  Office 1204, Marina Plaza,
                  <br />
                  Dubai Marina, Dubai, UAE
                </span>
              </li>
              <li>
                <a
                  href="tel:+97141234567"
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors duration-200"
                >
                  <Phone className="h-5 w-5 text-brand-gold shrink-0" />
                  +971 4 123 4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@shefa.ae"
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors duration-200"
                >
                  <Mail className="h-5 w-5 text-brand-gold shrink-0" />
                  info@shefa.ae
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <span className="text-sm text-white/70 leading-relaxed">
                  Mon - Sat: 9:00 AM - 7:00 PM
                  <br />
                  Sunday: By Appointment
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-gold/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/50">
              &copy; {new Date().getFullYear()} Shefa Real Estate. All rights
              reserved. Licensed by RERA.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {policyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs text-white/50 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
