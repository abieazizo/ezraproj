"use client";

import { useState } from "react";
import { Share2, Printer } from "lucide-react";

export default function SharePrintButtons({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/listings/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="hidden sm:flex items-center gap-2">
      <button
        onClick={handleShare}
        className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-slate hover:text-brand-gold border border-gray-200 rounded-lg hover:border-brand-gold/30 transition-colors"
      >
        <Share2 className="w-3.5 h-3.5" />
        {copied ? "Copied!" : "Share"}
      </button>
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-slate hover:text-brand-gold border border-gray-200 rounded-lg hover:border-brand-gold/30 transition-colors"
      >
        <Printer className="w-3.5 h-3.5" />
        Print
      </button>
    </div>
  );
}
