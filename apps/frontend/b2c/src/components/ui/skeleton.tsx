import { cn } from "./utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "circular" | "text";
}

export function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]",
        {
          "rounded-md": variant === "default",
          "rounded-full": variant === "circular",
          "rounded h-4": variant === "text",
        },
        className
      )}
      style={{
        animation: "shimmer 2s infinite",
      }}
      {...props}
    />
  );
}

// Text skeleton with multiple lines
interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={cn(
            "h-4",
            i === lines - 1 && lines > 1 ? "w-4/5" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

// Card skeleton
export function SkeletonCard() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Skeleton variant="circular" className="h-12 w-12" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
        <Skeleton className="h-40 w-full" />
        <SkeletonText lines={2} />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}

// Flight result skeleton
export function SkeletonFlightCard() {
  return (
    <div className="rounded-xl border-2 bg-white/80 backdrop-blur-sm p-6 shadow-sm">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton variant="circular" className="h-16 w-16" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
            <div className="flex-1 flex flex-col items-center px-4">
              <Skeleton className="h-3 w-24 mb-2" />
              <Skeleton className="h-[2px] w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>
        
        <div className="md:w-48 flex flex-col justify-between items-end space-y-4">
          <div className="space-y-2 text-right">
            <Skeleton className="h-8 w-24 ml-auto" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

// Hotel result skeleton
export function SkeletonHotelCard() {
  return (
    <div className="rounded-xl border-2 bg-white/80 backdrop-blur-sm overflow-hidden shadow-sm">
      <div className="flex flex-col md:flex-row">
        <Skeleton className="md:w-1/3 h-64" />
        <div className="md:w-2/3 p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-48" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
          
          <SkeletonText lines={2} />
          
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
          
          <div className="flex items-end justify-between pt-4 border-t">
            <div className="space-y-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Car result skeleton
export function SkeletonCarCard() {
  return (
    <div className="rounded-xl border-2 bg-white/80 backdrop-blur-sm overflow-hidden shadow-sm">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
          <Skeleton className="h-48 w-full" />
        </div>
        <div className="md:w-2/3 p-6 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
          
          <div className="flex items-end justify-between pt-4 border-t">
            <div className="space-y-1">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-20" />
            </div>
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Package result skeleton
export function SkeletonPackageCard() {
  return (
    <div className="rounded-2xl border-2 bg-white/90 backdrop-blur-sm overflow-hidden shadow-lg">
      <Skeleton className="h-64 w-full" />
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-28" />
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="space-y-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-28" />
          </div>
          <Skeleton className="h-12 w-36" />
        </div>
      </div>
    </div>
  );
}

// Attraction card skeleton
export function SkeletonAttractionCard() {
  return (
    <div className="rounded-xl border-2 bg-white/80 backdrop-blur-sm overflow-hidden shadow-sm">
      <Skeleton className="h-56 w-full" />
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        
        <SkeletonText lines={2} />
        
        <div className="flex gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-20" />
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="space-y-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-7 w-20" />
          </div>
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    </div>
  );
}

// Trip card skeleton (for My Trips page)
export function SkeletonTripCard() {
  return (
    <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
      <div className="flex flex-col md:flex-row">
        <div className="bg-gradient-to-br from-gray-300 to-gray-400 p-8 md:w-64 flex flex-col justify-between">
          <div className="space-y-4">
            <Skeleton className="h-6 w-24 bg-white/30" />
            <Skeleton className="h-8 w-40 bg-white/30" />
            <Skeleton className="h-4 w-32 bg-white/30" />
          </div>
          <Skeleton className="h-8 w-20 bg-white/30" />
        </div>
        
        <div className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-36" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Skeleton variant="circular" className="h-10 w-10" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Skeleton variant="circular" className="h-10 w-10" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-36" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Deal card skeleton
export function SkeletonDealCard() {
  return (
    <div className="rounded-xl border-2 bg-white overflow-hidden shadow-md">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-8 w-16" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

// Search result header skeleton
export function SkeletonResultsHeader() {
  return (
    <div className="mb-8 p-6 rounded-2xl bg-white/70 backdrop-blur-lg border border-white/50 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-3 flex-1">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      
      <div className="flex gap-2">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-7 w-36" />
      </div>
    </div>
  );
}