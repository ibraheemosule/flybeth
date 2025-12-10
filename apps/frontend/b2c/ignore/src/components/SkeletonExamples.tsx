import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonFlightCard,
  SkeletonHotelCard,
  SkeletonCarCard,
  SkeletonPackageCard,
  SkeletonAttractionCard,
  SkeletonTripCard,
  SkeletonDealCard,
  SkeletonResultsHeader,
} from "./ui/skeleton";

/**
 * Example component showcasing all skeleton loaders
 * Use these in your components while data is loading
 */
export function SkeletonExamples() {
  return (
    <div className="container mx-auto py-12 space-y-12">
      {/* Basic Skeleton Examples */}
      <section>
        <h2 className="mb-6">Basic Skeleton Components</h2>
        
        <div className="space-y-6">
          {/* Text Skeletons */}
          <div className="p-6 bg-white rounded-xl border">
            <h3 className="mb-4">Text Skeletons</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Single line:</p>
                <Skeleton className="h-4 w-64" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Multiple lines (3):</p>
                <SkeletonText lines={3} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Multiple lines (5):</p>
                <SkeletonText lines={5} />
              </div>
            </div>
          </div>

          {/* Shape Skeletons */}
          <div className="p-6 bg-white rounded-xl border">
            <h3 className="mb-4">Shape Skeletons</h3>
            <div className="flex gap-6 flex-wrap">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Circular:</p>
                <Skeleton variant="circular" className="h-16 w-16" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Rectangle:</p>
                <Skeleton className="h-16 w-32" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Square:</p>
                <Skeleton className="h-24 w-24" />
              </div>
            </div>
          </div>

          {/* Generic Card Skeleton */}
          <div className="p-6 bg-white rounded-xl border">
            <h3 className="mb-4">Generic Card Skeleton</h3>
            <SkeletonCard />
          </div>
        </div>
      </section>

      {/* Booking Type Skeletons */}
      <section>
        <h2 className="mb-6">Booking Result Skeletons</h2>
        
        <div className="space-y-6">
          {/* Results Header */}
          <div>
            <h3 className="mb-4">Results Header Skeleton</h3>
            <SkeletonResultsHeader />
          </div>

          {/* Flight Card */}
          <div>
            <h3 className="mb-4">Flight Result Skeleton</h3>
            <SkeletonFlightCard />
          </div>

          {/* Hotel Card */}
          <div>
            <h3 className="mb-4">Hotel Result Skeleton</h3>
            <SkeletonHotelCard />
          </div>

          {/* Car Card */}
          <div>
            <h3 className="mb-4">Car Result Skeleton</h3>
            <SkeletonCarCard />
          </div>

          {/* Package Card */}
          <div>
            <h3 className="mb-4">Package Result Skeleton</h3>
            <div className="max-w-md">
              <SkeletonPackageCard />
            </div>
          </div>

          {/* Attraction Card */}
          <div>
            <h3 className="mb-4">Attraction Result Skeleton</h3>
            <div className="max-w-md">
              <SkeletonAttractionCard />
            </div>
          </div>
        </div>
      </section>

      {/* Other Skeletons */}
      <section>
        <h2 className="mb-6">Other Skeletons</h2>
        
        <div className="space-y-6">
          {/* Trip Card */}
          <div>
            <h3 className="mb-4">Trip Card Skeleton (My Trips Page)</h3>
            <SkeletonTripCard />
          </div>

          {/* Deal Card */}
          <div>
            <h3 className="mb-4">Deal Card Skeleton</h3>
            <div className="max-w-sm">
              <SkeletonDealCard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * USAGE EXAMPLES:
 * 
 * 1. Basic usage in a component:
 * 
 * function MyComponent() {
 *   const [isLoading, setIsLoading] = useState(true);
 *   const [data, setData] = useState(null);
 * 
 *   if (isLoading) {
 *     return <SkeletonFlightCard />;
 *   }
 * 
 *   return <FlightCard data={data} />;
 * }
 * 
 * 2. Multiple skeletons:
 * 
 * {isLoading ? (
 *   <div className="space-y-4">
 *     {Array.from({ length: 5 }).map((_, i) => (
 *       <SkeletonFlightCard key={i} />
 *     ))}
 *   </div>
 * ) : (
 *   flights.map(flight => <FlightCard key={flight.id} flight={flight} />)
 * )}
 * 
 * 3. Custom skeleton:
 * 
 * function CustomSkeleton() {
 *   return (
 *     <div className="p-6 space-y-4">
 *       <div className="flex gap-4">
 *         <Skeleton variant="circular" className="h-12 w-12" />
 *         <div className="flex-1 space-y-2">
 *           <Skeleton className="h-4 w-1/2" />
 *           <Skeleton className="h-3 w-1/3" />
 *         </div>
 *       </div>
 *       <SkeletonText lines={3} />
 *       <Skeleton className="h-10 w-full" />
 *     </div>
 *   );
 * }
 * 
 * 4. Text skeleton with custom number of lines:
 * 
 * <SkeletonText lines={7} className="max-w-2xl" />
 * 
 * 5. Results page with header and cards:
 * 
 * {isLoading ? (
 *   <>
 *     <SkeletonResultsHeader />
 *     <div className="space-y-6">
 *       {Array.from({ length: 3 }).map((_, i) => (
 *         <SkeletonHotelCard key={i} />
 *       ))}
 *     </div>
 *   </>
 * ) : (
 *   // ... actual content
 * )}
 */
