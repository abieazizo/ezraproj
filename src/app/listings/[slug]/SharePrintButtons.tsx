"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Printer, Link2, Check } from "lucide-react";

interface SharePrintButtonsProps {
  title: string;
  slug: string;
}

export default function SharePrintButtons({ title, slug }: SharePrintButtonsProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const url = `https://shefa.ae/listings/${slug}`;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Share */}
      <div ref={ref} className="relative">
        <button
          onClick={() => setShareOpen(!shareOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-brand-slate hover:text-brand-gold rounded-lg hover:bg-white transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>

        {shareOpen && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-card-lg border border-gray-100 py-2 z-20">
            <button
              onClick={copyLink}
              className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-brand-navy hover:bg-brand-cream transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-brand-navy hover:bg-brand-cream transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              Twitter / X
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-brand-navy hover:bg-brand-cream transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" /></svg>
              LinkedIn
            </a>
          </div>
        )}
      </div>

      {/* Print */}
      <button
        onClick={() => window.print()}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-brand-slate hover:text-brand-gold rounded-lg hover:bg-white transition-colors"
      >
        <Printer className="w-4 h-4" />
        Print
      </button>
    </div>
  );
}
