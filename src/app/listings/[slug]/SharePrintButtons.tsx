"use client";

import { useState } from "react";
import { Share2, Printer, Check } from "lucide-react";

export default function SharePrintButtons() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        className="relative flex items-center gap-1.5 px-3 py-1.5 text-sm text-brand-slate hover:text-brand-navy border border-gray-200 rounded-lg hover:border-brand-gold transition-colors"
        aria-label="Share property"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-600" />
            <span className="text-green-600">Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </>
        )}
      </button>
      <button
        onClick={handlePrint}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-brand-slate hover:text-brand-navy border border-gray-200 rounded-lg hover:border-brand-gold transition-colors"
        aria-label="Print property"
      >
        <Printer className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Print</span>
      </button>
    </div>
  );
}
