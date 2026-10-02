import { cn } from "@/lib/utils";

interface PropertyCardSkeletonProps {
  variant?: "default" | "compact" | "horizontal" | "featured";
  className?: string;
}

export default function PropertyCardSkeleton({
  variant = "default",
  className,
}: PropertyCardSkeletonProps) {
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex flex-row h-[100px] rounded-xl overflow-hidden bg-white shadow-card",
          className
        )}
      >
        <div className="w-[100px] h-full bg-gray-200 animate-pulse" />
        <div className="flex-1 p-3 flex flex-col justify-center gap-2">
          <div className="h-3.5 w-3/4 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div
        className={cn(
          "flex flex-row rounded-xl overflow-hidden bg-white shadow-card",
          className
        )}
      >
        <div className="w-[40%] min-h-[200px] bg-gray-200 animate-pulse" />
        <div className="w-[60%] p-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const isFeatured = variant === "featured";
  const cardHeight = isFeatured ? "h-[480px]" : "h-[380px]";
  const imageHeight = isFeatured ? "h-[65%]" : "h-[55%]";
  const contentHeight = isFeatured ? "h-[35%]" : "h-[45%]";

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden bg-white shadow-card",
        cardHeight,
        className
      )}
    >
      {/* Image skeleton */}
      <div className={cn("bg-gray-200 animate-pulse", imageHeight)} />

      {/* Content skeleton */}
      <div className={cn("p-4 flex flex-col justify-between", contentHeight)}>
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
  );
}
