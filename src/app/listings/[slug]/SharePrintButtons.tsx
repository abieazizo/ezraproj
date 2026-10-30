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
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-brand-slate hover:text-brand-gold bg-white rounded-lg border border-gray-200 hover:border-brand-gold/30 transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-500" />
            <span className="text-green-600">Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5" />
            Share
          </>
        )}
      </button>
      <button
        onClick={handlePrint}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-brand-slate hover:text-brand-gold bg-white rounded-lg border border-gray-200 hover:border-brand-gold/30 transition-colors"
      >
        <Printer className="w-3.5 h-3.5" />
        Print
      </button>
    </div>
  );
}
