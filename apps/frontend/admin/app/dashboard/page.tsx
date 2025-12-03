'use client';

import { DashboardPage } from '../../src/pages/DashboardPage';
import { DashboardLayout } from '../../src/components/DashboardLayout';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardPage />
    </DashboardLayout>
  );
}