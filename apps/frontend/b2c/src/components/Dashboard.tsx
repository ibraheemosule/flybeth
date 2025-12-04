import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripSchema, type TripInput } from "@packages/shared-schemas";
import { useAuthStore } from "@/store/authStore";
import { useTripStore } from "@/store/tripStore";
import {
  LogOut,
  Plane,
  Calendar,
  MapPin,
  Users,
  CreditCard,
} from "lucide-react";

export default function Dashboard() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const { user, logout } = useAuthStore();
  const { trips, isLoading, bookTrip, fetchMyTrips } = useTripStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TripInput>({
    resolver: zodResolver(tripSchema),
  });

  useEffect(() => {
    fetchMyTrips();
  }, [fetchMyTrips]);

  const onBookTrip = async (data: TripInput) => {
    try {
      await bookTrip({
        destination: data.destination,
        startDate: data.startDate,
        endDate: data.endDate,
        travelers: Number(data.travelers),
      });

      reset();
      setShowBookingForm(false);
      fetchMyTrips();
    } catch {
      // Error handled in store
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Plane className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">FlyBeth</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <p className="font-medium text-gray-900">
                  Hello {user?.firstName} {user?.lastName}! 👋
                </p>
                <p className="text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              {user?.userType === "BUSINESS"
                ? "Hello Business User! 🏢"
                : "Hello Independent User! ✈️"}
            </h2>
            <p className="text-blue-700">
              {user?.userType === "BUSINESS"
                ? "Welcome to your business travel dashboard. Manage bookings for your platform users."
                : "Welcome to your travel dashboard. Book amazing trips and manage your bookings."}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => setShowBookingForm(true)}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
                <Plane className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Book New Trip
              </h3>
              <p className="text-gray-500 text-sm">Plan your next adventure</p>
            </button>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 mx-auto">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {trips.length} {trips.length === 1 ? "Trip" : "Trips"}
              </h3>
              <p className="text-gray-500 text-sm">View your bookings</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4 mx-auto">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Destinations
              </h3>
              <p className="text-gray-500 text-sm">Explore new places</p>
            </div>
          </div>

          {/* Recent Trips */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Trips
              </h3>
            </div>
            <div className="px-6 py-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-500">Loading trips...</p>
                </div>
              ) : trips.length > 0 ? (
                <div className="space-y-4">
                  {trips.slice(0, 5).map(trip => (
                    <div
                      key={trip.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                          <h4 className="text-md font-medium text-gray-900">
                            {trip.destination}
                          </h4>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(trip.startDate).toLocaleDateString()} -{" "}
                          {new Date(trip.endDate).toLocaleDateString()}
                          <Users className="h-4 w-4 ml-4 mr-1" />
                          {trip.travelers}{" "}
                          {trip.travelers === 1 ? "traveler" : "travelers"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-900 mb-1">
                          <CreditCard className="h-4 w-4 mr-1" />$
                          {trip.totalAmount}
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            trip.status === "CONFIRMED"
                              ? "bg-green-100 text-green-800"
                              : trip.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800"
                              : trip.status === "CANCELLED"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {trip.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No trips yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Start planning your first adventure!
                  </p>
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Book Your First Trip
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Book New Trip
                </h3>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit(onBookTrip)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destination
                  </label>
                  <input
                    {...register("destination")}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Paris, France"
                  />
                  {errors.destination && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.destination.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      {...register("startDate")}
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.startDate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.startDate.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      {...register("endDate")}
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.endDate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.endDate.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Travelers
                  </label>
                  <input
                    {...register("travelers", { valueAsNumber: true })}
                    type="number"
                    min="1"
                    max="20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1"
                  />
                  {errors.travelers && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.travelers.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Booking..." : "Book Trip"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
