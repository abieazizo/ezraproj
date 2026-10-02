import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function PropertyNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand-cream/50 px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-full bg-brand-cream mx-auto mb-6 flex items-center justify-center">
          <Search className="w-10 h-10 text-brand-slate-400" />
        </div>

        <h1 className="font-display text-3xl font-bold text-brand-navy mb-3">
          Property Not Found
        </h1>
        <p className="text-brand-slate mb-8 leading-relaxed">
          The property you are looking for may have been removed, sold, or the
          link may be incorrect. Please check the URL or browse our available
          listings.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold text-white font-semibold rounded-lg hover:bg-brand-gold-400 transition-colors duration-200"
          >
            <Search className="w-4 h-4" />
            Browse Listings
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-navy text-brand-navy font-semibold rounded-lg hover:bg-brand-navy hover:text-white transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
