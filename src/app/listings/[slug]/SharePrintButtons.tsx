"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Printer, Copy, Check } from "lucide-react";

interface SharePrintButtonsProps {
  title: string;
  slug: string;
}

export default function SharePrintButtons({ title, slug }: SharePrintButtonsProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const url = typeof window !== "undefined"
    ? window.location.href
    : `https://shefa.ae/listings/${slug}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 1500);
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
  };

  const shareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-1">
      {/* Share */}
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-brand-slate hover:text-brand-gold hover:bg-brand-cream transition-colors"
          aria-label="Share"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Share</span>
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-lg shadow-card-lg border border-gray-100 py-1 z-20">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-brand-navy hover:bg-brand-cream transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button
              onClick={shareTwitter}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-brand-navy hover:bg-brand-cream transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Share on X
            </button>
            <button
              onClick={shareLinkedIn}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-brand-navy hover:bg-brand-cream transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Share on LinkedIn
            </button>
          </div>
        )}
      </div>

      {/* Print */}
      <button
        onClick={() => window.print()}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-brand-slate hover:text-brand-gold hover:bg-brand-cream transition-colors"
        aria-label="Print"
      >
        <Printer className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Print</span>
      </button>
    </div>
  );
}
