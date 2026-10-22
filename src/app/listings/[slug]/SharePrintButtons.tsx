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
      // fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-brand-slate hover:text-brand-gold transition-colors rounded-md hover:bg-brand-cream"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Share2 className="w-4 h-4" />
        )}
        {copied ? "Copied!" : "Share"}
      </button>
      <button
        onClick={handlePrint}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-brand-slate hover:text-brand-gold transition-colors rounded-md hover:bg-brand-cream"
      >
        <Printer className="w-4 h-4" />
        Print
      </button>
    </div>
  );
}
