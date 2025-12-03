import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UsersPage } from './pages/UsersPage';
import { BookingsPage } from './pages/BookingsPage';
import { useAuthStore } from './store/authStore';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

function App() {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Header user={user} />
            <main className="p-6">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/bookings" element={<BookingsPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
