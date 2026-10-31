"use client";

import { useState } from "react";
import { Share2, Printer, Check } from "lucide-react";

export default function SharePrintButtons() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          url: window.location.href,
          title: document.title,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // user cancelled share dialog
    }
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={handleShare}
        className="p-2 rounded-lg text-brand-slate hover:text-brand-gold hover:bg-brand-cream transition-colors"
        aria-label="Share"
        title={copied ? "Link copied!" : "Share"}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Share2 className="w-4 h-4" />
        )}
      </button>
      <button
        onClick={() => window.print()}
        className="p-2 rounded-lg text-brand-slate hover:text-brand-gold hover:bg-brand-cream transition-colors"
        aria-label="Print"
        title="Print"
      >
        <Printer className="w-4 h-4" />
      </button>
    </div>
  );
}
