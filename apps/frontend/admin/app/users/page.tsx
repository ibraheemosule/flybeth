'use client';

import { UsersPage } from '../../src/pages/UsersPage';
import { DashboardLayout } from '../../src/components/DashboardLayout';

export default function Users() {
  return (
    <DashboardLayout>
      <UsersPage />
    </DashboardLayout>
  );
}