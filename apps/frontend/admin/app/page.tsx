'use client';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Travel Platform Admin</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
          <p className="text-gray-600">✅ Next.js App Router is working!</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Users</h3>
              <p className="text-blue-600">Manage user accounts</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Bookings</h3>
              <p className="text-green-600">View all bookings</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800">Analytics</h3>
              <p className="text-purple-600">View reports</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}