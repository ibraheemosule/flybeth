"use client";

import AuthPage from "./pages/AuthPage";

export function B2CApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">FlyBeth B2C</h1>
        <AuthPage />
      </div>
    </div>
  );
}

export default B2CApp;
