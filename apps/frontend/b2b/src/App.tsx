'use client';

import { useState } from 'react';
import './App.css';

export function B2BApp() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Travel Platform B2B Portal</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome to B2B Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Partner Bookings</h3>
              <p className="text-blue-600">Manage your agency bookings</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Inventory</h3>
              <p className="text-green-600">View available packages</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800">Reports</h3>
              <p className="text-purple-600">Analytics and insights</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <button 
              onClick={() => setCount((count) => count + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Test Counter: {count}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default B2BApp;
