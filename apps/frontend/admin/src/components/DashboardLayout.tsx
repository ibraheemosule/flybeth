'use client';

import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header user={user} />
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}