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
} from "../../ui/skeleton";

/**
 * Example component showcasing all skeleton loaders
 * Use these in your components while data is loading
 */
export default function SkeletonExamplesPage() {
  return (
    <div className="container mx-auto py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Skeleton Loading Examples</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A comprehensive collection of skeleton loaders for different
          components and pages. Copy these patterns to show loading states
          throughout the application.
        </p>
      </div>

      {/* Basic Skeleton Examples */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Basic Skeleton Components</h2>

        <div className="space-y-6">
          {/* Text Skeletons */}
          <div className="p-6 bg-white rounded-xl border">
            <h3 className="text-lg font-semibold mb-4">Text Skeletons</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Single line:
                </p>
                <Skeleton className="h-4 w-64" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Multiple lines (3):
                </p>
                <SkeletonText lines={3} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Multiple lines (5):
                </p>
                <SkeletonText lines={5} />
              </div>
            </div>
          </div>

          {/* Shape Skeletons */}
          <div className="p-6 bg-white rounded-xl border">
            <h3 className="text-lg font-semibold mb-4">Shape Skeletons</h3>
            <div className="flex gap-6 flex-wrap">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Rectangle:</p>
                <Skeleton className="h-24 w-32" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Circle:</p>
                <Skeleton variant="circular" className="h-16 w-16" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Avatar:</p>
                <Skeleton variant="circular" className="h-12 w-12" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complex Component Skeletons */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Component Skeletons</h2>

        <div className="grid gap-6">
          {/* Generic Card */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Generic Card Skeleton
            </h3>
            <SkeletonCard />
          </div>

          {/* Search Results Header */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Search Results Header
            </h3>
            <SkeletonResultsHeader />
          </div>
        </div>
      </section>

      {/* Travel Component Skeletons */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Travel Component Skeletons</h2>

        <div className="space-y-8">
          {/* Flight Card */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Flight Result Card</h3>
            <SkeletonFlightCard />
          </div>

          {/* Hotel Card */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hotel Result Card</h3>
            <SkeletonHotelCard />
          </div>

          {/* Car Card */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Car Result Card</h3>
            <SkeletonCarCard />
          </div>

          {/* Package Card */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Package Deal Card</h3>
            <SkeletonPackageCard />
          </div>

          {/* Attraction Card */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Attraction Card</h3>
            <SkeletonAttractionCard />
          </div>

          {/* Trip Card */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Trip Card (My Trips)</h3>
            <SkeletonTripCard />
          </div>

          {/* Deal Card */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Deal Card</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SkeletonDealCard />
              <SkeletonDealCard />
              <SkeletonDealCard />
            </div>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Usage Examples</h2>
        <div className="p-6 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">
            How to Use These Skeletons
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium">In your components:</h4>
              <pre className="bg-white p-3 rounded mt-2 text-xs overflow-x-auto">
                {`import { SkeletonFlightCard } from "@/components/ui";

function FlightResults({ loading, flights }) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <SkeletonFlightCard key={i} />
        ))}
      </div>
    );
  }
  
  return flights.map(flight => <FlightCard key={flight.id} flight={flight} />);
}`}
              </pre>
            </div>
            <div>
              <h4 className="font-medium">For loading arrays:</h4>
              <pre className="bg-white p-3 rounded mt-2 text-xs overflow-x-auto">
                {`{loading ? (
  Array.from({ length: 5 }).map((_, index) => (
    <SkeletonCard key={index} />
  ))
) : (
  data.map(item => <Card key={item.id} item={item} />)
)}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Multiple Loading States */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          Multiple Loading States Demo
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Search Results (Loading 6 flights)
            </h3>
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonFlightCard key={index} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Hotel Gallery (Loading 9 hotels)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, index) => (
                <SkeletonHotelCard key={index} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Deals Section (Loading 6 deals)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonDealCard key={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
