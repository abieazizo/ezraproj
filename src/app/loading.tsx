export default function Loading() {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero Skeleton */}
      <div className="h-[50vh] bg-gray-200 animate-pulse relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/30 to-brand-navy/60" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <div className="h-3 w-28 bg-white/20 rounded animate-pulse mb-4" />
          <div className="h-12 w-96 max-w-full bg-white/20 rounded animate-pulse mb-3" />
          <div className="h-5 w-64 bg-white/20 rounded animate-pulse" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Section Header Skeleton */}
        <div className="flex flex-col items-center gap-3 mb-12">
          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-80 max-w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-[3px] w-10 bg-brand-gold/30 rounded animate-pulse" />
          <div className="h-5 w-96 max-w-full bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden bg-white shadow-card h-[380px]"
            >
              {/* Image skeleton */}
              <div className="h-[55%] bg-gray-200 animate-pulse" />

              {/* Content skeleton */}
              <div className="h-[45%] p-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-6 w-2/5 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-3/5 bg-gray-200 rounded animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-3 w-14 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-14 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-14 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
