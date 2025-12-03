import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'suspended' | 'pending';
  lastLogin: string;
  createdAt: string;
}

interface UserFilters {
  role?: string;
  status?: string;
  search?: string;
}

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<UserFilters>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams();
      if (filters.role) queryParams.append('role', filters.role);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.search) queryParams.append('search', filters.search);

      const response = await fetch(`/api/admin/users?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId: string, status: User['status']) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      setUsers(prev =>
        prev.map(user =>
          user.id === userId ? { ...user, status } : user
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
    }
  };

  const updateUserRole = async (userId: string, role: User['role']) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      setUsers(prev =>
        prev.map(user =>
          user.id === userId ? { ...user, role } : user
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user role');
    }
  };

  const deleteSelectedUsers = async () => {
    try {
      const response = await fetch('/api/admin/users/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIds: Array.from(selectedUsers) })
      });

      if (!response.ok) {
        throw new Error('Failed to delete users');
      }

      setUsers(prev => prev.filter(user => !selectedUsers.has(user.id)));
      setSelectedUsers(new Set());
      setShowDeleteConfirm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete users');
    }
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const selectAllUsers = () => {
    setSelectedUsers(new Set(users.map(user => user.id)));
  };

  const clearSelection = () => {
    setSelectedUsers(new Set());
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers();
  };

  return (
    <div data-testid="user-management">
      <h1>User Management</h1>
      
      <form onSubmit={handleFilterSubmit} data-testid="filter-form">
        <input
          type="text"
          placeholder="Search users..."
          value={filters.search || ''}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          data-testid="search-input"
        />
        
        <select
          value={filters.role || ''}
          onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value || undefined }))}
          data-testid="role-filter"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
          <option value="user">User</option>
        </select>
        
        <select
          value={filters.status || ''}
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value || undefined }))}
          data-testid="status-filter"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="pending">Pending</option>
        </select>
        
        <button type="submit" data-testid="filter-submit">
          Filter
        </button>
      </form>

      {error && (
        <div data-testid="error" className="error">
          {error}
        </div>
      )}

      {loading && (
        <div data-testid="loading">Loading users...</div>
      )}

      {!loading && (
        <div data-testid="user-controls">
          <div className="selection-controls">
            <button onClick={selectAllUsers} data-testid="select-all">
              Select All ({users.length})
            </button>
            <button onClick={clearSelection} data-testid="clear-selection">
              Clear Selection
            </button>
            <span data-testid="selected-count">
              {selectedUsers.size} selected
            </span>
          </div>
          
          {selectedUsers.size > 0 && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              data-testid="bulk-delete"
              className="danger"
            >
              Delete Selected ({selectedUsers.size})
            </button>
          )}
        </div>
      )}

      <div data-testid="users-table">
        {users.length === 0 && !loading ? (
          <div data-testid="no-users">No users found</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} data-testid={`user-row-${user.id}`}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.has(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      data-testid={`select-${user.id}`}
                    />
                  </td>
                  <td data-testid={`name-${user.id}`}>
                    {user.firstName} {user.lastName}
                  </td>
                  <td data-testid={`email-${user.id}`}>{user.email}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value as User['role'])}
                      data-testid={`role-${user.id}`}
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={user.status}
                      onChange={(e) => updateUserStatus(user.id, e.target.value as User['status'])}
                      data-testid={`status-${user.id}`}
                    >
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                      <option value="pending">Pending</option>
                    </select>
                  </td>
                  <td data-testid={`last-login-${user.id}`}>{user.lastLogin}</td>
                  <td>
                    <button
                      onClick={() => updateUserStatus(user.id, user.status === 'active' ? 'suspended' : 'active')}
                      data-testid={`toggle-status-${user.id}`}
                    >
                      {user.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showDeleteConfirm && (
        <div data-testid="delete-confirm-modal" className="modal">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete {selectedUsers.size} user(s)? This action cannot be undone.</p>
            <button
              onClick={deleteSelectedUsers}
              data-testid="confirm-delete"
              className="danger"
            >
              Delete Users
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              data-testid="cancel-delete"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};