import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-brand-cream">
      <div className="text-center max-w-lg">
        {/* Inline SVG House Illustration */}
        <svg
          className="w-52 h-52 mx-auto mb-8"
          viewBox="0 0 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Ground */}
          <ellipse cx="110" cy="190" rx="90" ry="8" fill="#0A1628" opacity="0.06" />

          {/* House Body */}
          <rect x="55" y="95" width="110" height="85" rx="4" fill="#0A1628" opacity="0.08" />

          {/* Roof */}
          <polygon points="110,35 35,100 185,100" fill="#C9A84C" opacity="0.25" />
          <polygon points="110,45 48,100 172,100" fill="#C9A84C" opacity="0.15" />

          {/* Chimney */}
          <rect x="145" y="50" width="18" height="35" rx="2" fill="#0A1628" opacity="0.1" />

          {/* Left Window */}
          <rect x="72" y="112" width="28" height="28" rx="3" fill="#C9A84C" opacity="0.4" />
          <line x1="86" y1="112" x2="86" y2="140" stroke="white" strokeWidth="2" opacity="0.6" />
          <line x1="72" y1="126" x2="100" y2="126" stroke="white" strokeWidth="2" opacity="0.6" />

          {/* Right Window */}
          <rect x="120" y="112" width="28" height="28" rx="3" fill="#C9A84C" opacity="0.4" />
          <line x1="134" y1="112" x2="134" y2="140" stroke="white" strokeWidth="2" opacity="0.6" />
          <line x1="120" y1="126" x2="148" y2="126" stroke="white" strokeWidth="2" opacity="0.6" />

          {/* Door */}
          <rect x="93" y="148" width="34" height="32" rx="3" fill="#0A1628" opacity="0.15" />
          <circle cx="121" cy="165" r="2.5" fill="#C9A84C" opacity="0.6" />

          {/* 404 Text */}
          <text
            x="110"
            y="88"
            textAnchor="middle"
            fill="#0A1628"
            fontSize="18"
            fontWeight="bold"
            opacity="0.5"
            fontFamily="serif"
          >
            404
          </text>

          {/* Question mark above house */}
          <text
            x="110"
            y="25"
            textAnchor="middle"
            fill="#C9A84C"
            fontSize="22"
            fontWeight="bold"
            opacity="0.6"
            fontFamily="serif"
          >
            ?
          </text>
        </svg>

        <h1 className="font-display text-4xl font-bold text-brand-navy mb-3">
          Page Not Found
        </h1>
        <p className="text-brand-slate text-lg mb-8">
          This property doesn&apos;t exist... yet. But we have plenty of
          amazing listings waiting for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/listings"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-gold text-white font-semibold rounded-lg hover:bg-brand-gold-400 transition-colors"
          >
            <Search className="w-4 h-4" />
            Search Properties
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border-2 border-brand-navy text-brand-navy font-semibold rounded-lg hover:bg-brand-navy hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
