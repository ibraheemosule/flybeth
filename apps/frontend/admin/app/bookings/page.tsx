'use client';

import { BookingsPage } from '../../src/pages/BookingsPage';
import { DashboardLayout } from '../../src/components/DashboardLayout';

export default function Bookings() {
  return (
    <DashboardLayout>
      <BookingsPage />
    </DashboardLayout>
  );
}