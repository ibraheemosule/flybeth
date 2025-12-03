import React from 'react';
import { useAuthStore } from '../store/authStore';

interface HeaderProps {
  user: any;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const { logout } = useAuthStore();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Welcome, {user?.name || 'Admin'}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            
            <button
              onClick={logout}
              className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded border border-gray-300 hover:border-gray-400"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};