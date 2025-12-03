import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { UserManagement } from '../components/UserManagement';

// Mock users data
const mockUsers = [
  {
    id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'user' as const,
    status: 'active' as const,
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'jane.smith@example.com', 
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'moderator' as const,
    status: 'active' as const,
    lastLogin: '2024-01-14T15:45:00Z',
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin' as const,
    status: 'active' as const,
    lastLogin: '2024-01-16T09:15:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    email: 'suspended@example.com',
    firstName: 'Suspended',
    lastName: 'User',
    role: 'user' as const,
    status: 'suspended' as const,
    lastLogin: '2024-01-10T12:00:00Z',
    createdAt: '2024-01-05T00:00:00Z'
  }
];

// Set up MSW server
const server = setupServer(
  // Fetch users handler
  http.get('/api/admin/users', ({ request }) => {
    const url = new URL(request.url);
    const role = url.searchParams.get('role');
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search');
    
    let filteredUsers = [...mockUsers];
    
    // Filter by role
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }
    
    // Filter by status
    if (status) {
      filteredUsers = filteredUsers.filter(user => user.status === status);
    }
    
    // Filter by search
    if (search && search.trim()) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }
    
    return HttpResponse.json({ users: filteredUsers });
  }),

  // Update user status
  http.patch('/api/admin/users/:id/status', ({ params, request }) => {
    return HttpResponse.json({ 
      id: params.id, 
      success: true, 
      message: 'User status updated' 
    });
  }),

  // Update user role
  http.patch('/api/admin/users/:id/role', ({ params, request }) => {
    return HttpResponse.json({ 
      id: params.id, 
      success: true, 
      message: 'User role updated' 
    });
  }),

  // Bulk delete users
  http.post('/api/admin/users/bulk-delete', ({ request }) => {
    return HttpResponse.json({ 
      success: true, 
      message: 'Users deleted successfully' 
    });
  })
);

describe('UserManagement Component', () => {
  beforeEach(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('loads and displays users', async () => {
    render(<UserManagement />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Check that users are displayed
    expect(screen.getByTestId('user-management')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Admin User')).toBeInTheDocument();

    // Check user details
    expect(screen.getByTestId('email-1')).toHaveTextContent('john.doe@example.com');
    expect(screen.getByTestId('role-1')).toHaveValue('user');
    expect(screen.getByTestId('status-1')).toHaveValue('active');
  });

  it('filters users by role', async () => {
    const user = userEvent.setup();
    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Filter by admin role
    const roleFilter = screen.getByTestId('role-filter');
    await user.selectOptions(roleFilter, 'admin');
    await user.click(screen.getByTestId('filter-submit'));

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Should only show admin user
    expect(screen.getByText('Admin User')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('filters users by status', async () => {
    const user = userEvent.setup();
    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Filter by suspended status
    const statusFilter = screen.getByTestId('status-filter');
    await user.selectOptions(statusFilter, 'suspended');
    await user.click(screen.getByTestId('filter-submit'));

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Should only show suspended user
    expect(screen.getByText('Suspended User')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('searches users by name and email', async () => {
    const user = userEvent.setup();
    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Search for 'Jane'
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'Jane');
    await user.click(screen.getByTestId('filter-submit'));

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Should only show Jane
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('updates user status successfully', async () => {
    const user = userEvent.setup();
    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Change user status
    const statusSelect = screen.getByTestId('status-1');
    await user.selectOptions(statusSelect, 'suspended');

    await waitFor(() => {
      expect(statusSelect).toHaveValue('suspended');
    });
  });

  it('updates user role successfully', async () => {
    const user = userEvent.setup();
    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Change user role
    const roleSelect = screen.getByTestId('role-1');
    await user.selectOptions(roleSelect, 'moderator');

    await waitFor(() => {
      expect(roleSelect).toHaveValue('moderator');
    });
  });

  it('handles user selection and bulk operations', async () => {
    const user = userEvent.setup();
    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Initially no users selected
    expect(screen.getByTestId('selected-count')).toHaveTextContent('0 selected');

    // Select first user
    await user.click(screen.getByTestId('select-1'));
    expect(screen.getByTestId('selected-count')).toHaveTextContent('1 selected');

    // Select all users
    await user.click(screen.getByTestId('select-all'));
    expect(screen.getByTestId('selected-count')).toHaveTextContent('4 selected');

    // Clear selection
    await user.click(screen.getByTestId('clear-selection'));
    expect(screen.getByTestId('selected-count')).toHaveTextContent('0 selected');
  });

  it('handles bulk delete with confirmation', async () => {
    const user = userEvent.setup();
    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Select users for deletion
    await user.click(screen.getByTestId('select-1'));
    await user.click(screen.getByTestId('select-2'));

    // Click bulk delete button
    await user.click(screen.getByTestId('bulk-delete'));

    // Should show confirmation modal
    expect(screen.getByTestId('delete-confirm-modal')).toBeInTheDocument();
    expect(screen.getByText(/delete 2 user/)).toBeInTheDocument();

    // Confirm deletion
    await user.click(screen.getByTestId('confirm-delete'));

    await waitFor(() => {
      expect(screen.queryByTestId('delete-confirm-modal')).not.toBeInTheDocument();
    });

    // Users should be removed from the list
    expect(screen.queryByTestId('user-row-1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('user-row-2')).not.toBeInTheDocument();
    expect(screen.getByTestId('selected-count')).toHaveTextContent('0 selected');
  });

  it('handles canceling bulk delete', async () => {
    const user = userEvent.setup();
    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Select a user and try to delete
    await user.click(screen.getByTestId('select-1'));
    await user.click(screen.getByTestId('bulk-delete'));

    // Cancel deletion
    await user.click(screen.getByTestId('cancel-delete'));

    await waitFor(() => {
      expect(screen.queryByTestId('delete-confirm-modal')).not.toBeInTheDocument();
    });

    // User should still be there
    expect(screen.getByTestId('user-row-1')).toBeInTheDocument();
    expect(screen.getByTestId('selected-count')).toHaveTextContent('1 selected');
  });

  it('toggles user status with quick action button', async () => {
    const user = userEvent.setup();
    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Find active user and toggle status
    const toggleButton = screen.getByTestId('toggle-status-1');
    expect(toggleButton).toHaveTextContent('Suspend');

    await user.click(toggleButton);

    await waitFor(() => {
      expect(screen.getByTestId('status-1')).toHaveValue('suspended');
    });
  });

  it('handles API errors when loading users', async () => {
    // Override handler to return error
    server.use(
      http.get('/api/admin/users', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText(/Failed to fetch users/)).toBeInTheDocument();
    expect(screen.getByTestId('no-users')).toBeInTheDocument();
  });

  it('handles API errors when updating user status', async () => {
    const user = userEvent.setup();

    // Override status update to return error
    server.use(
      http.patch('/api/admin/users/:id/status', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Try to update status
    const statusSelect = screen.getByTestId('status-1');
    await user.selectOptions(statusSelect, 'suspended');

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText(/Failed to update user/)).toBeInTheDocument();
  });

  it('handles API errors when bulk deleting users', async () => {
    const user = userEvent.setup();

    // Override bulk delete to return error
    server.use(
      http.post('/api/admin/users/bulk-delete', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Select users and try to delete
    await user.click(screen.getByTestId('select-1'));
    await user.click(screen.getByTestId('bulk-delete'));
    await user.click(screen.getByTestId('confirm-delete'));

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText(/Failed to delete users/)).toBeInTheDocument();
  });

  it('shows empty state when no users exist', async () => {
    // Override handler to return empty array
    server.use(
      http.get('/api/admin/users', () => {
        return HttpResponse.json({ users: [] });
      })
    );

    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('no-users')).toBeInTheDocument();
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });
});