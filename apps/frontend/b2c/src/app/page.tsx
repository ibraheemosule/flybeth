"use client";

export default function B2CHomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          FlyBeth B2C Portal
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome to FlyBeth</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Book Flights</h3>
              <p className="text-gray-600">Find and book your next adventure</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Hotels</h3>
              <p className="text-gray-600">Comfortable stays worldwide</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Cars</h3>
              <p className="text-gray-600">Rental cars for your journey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
