import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BusinessTripList } from '../components/BusinessTripList';

// Mock data
const mockTrips = [
  {
    id: '1',
    title: 'Conference in New York',
    destination: 'New York, NY',
    startDate: '2024-01-15',
    endDate: '2024-01-18',
    budget: 2500,
    status: 'pending' as const,
    employeeId: 'EMP001'
  },
  {
    id: '2', 
    title: 'Client Meeting in London',
    destination: 'London, UK',
    startDate: '2024-02-10',
    endDate: '2024-02-12',
    budget: 3500,
    status: 'approved' as const,
    employeeId: 'EMP002'
  },
  {
    id: '3',
    title: 'Training in Berlin',
    destination: 'Berlin, Germany', 
    startDate: '2024-03-05',
    endDate: '2024-03-08',
    budget: 2000,
    status: 'rejected' as const,
    employeeId: 'EMP003'
  }
];

// Set up MSW server
const server = setupServer(
  // Default handler for fetching trips
  http.get('/api/business/trips', () => {
    return HttpResponse.json(mockTrips);
  }),

  // Default handler for approving trips
  http.post('/api/business/trips/:id/approve', ({ params }) => {
    return HttpResponse.json({ 
      id: params.id, 
      status: 'approved',
      message: 'Trip approved successfully' 
    });
  })
);

describe('BusinessTripList Component', () => {
  beforeEach(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('displays loading state initially', () => {
    render(<BusinessTripList />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('fetches and displays business trips', async () => {
    render(<BusinessTripList />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Check that trips are displayed
    expect(screen.getByTestId('business-trip-list')).toBeInTheDocument();
    expect(screen.getByText('Conference in New York')).toBeInTheDocument();
    expect(screen.getByText('Client Meeting in London')).toBeInTheDocument();
    expect(screen.getByText('Training in Berlin')).toBeInTheDocument();

    // Check specific trip details
    expect(screen.getByText('Destination: New York, NY')).toBeInTheDocument();
    expect(screen.getByText('Budget: $2500')).toBeInTheDocument();
    expect(screen.getByTestId('status-1')).toHaveTextContent('pending');
    expect(screen.getByTestId('status-2')).toHaveTextContent('approved');
    expect(screen.getByTestId('status-3')).toHaveTextContent('rejected');
  });

  it('shows approve button only for pending trips', async () => {
    render(<BusinessTripList />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Pending trip should have approve button
    expect(screen.getByTestId('approve-1')).toBeInTheDocument();
    
    // Approved and rejected trips should not have approve buttons
    expect(screen.queryByTestId('approve-2')).not.toBeInTheDocument();
    expect(screen.queryByTestId('approve-3')).not.toBeInTheDocument();
  });

  it('handles trip approval successfully', async () => {
    const user = userEvent.setup();
    render(<BusinessTripList />);

    // Wait for trips to load
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Verify initial status
    expect(screen.getByTestId('status-1')).toHaveTextContent('pending');

    // Click approve button
    const approveButton = screen.getByTestId('approve-1');
    await user.click(approveButton);

    // Wait for the status to update
    await waitFor(() => {
      expect(screen.getByTestId('status-1')).toHaveTextContent('approved');
    });

    // Approve button should disappear
    expect(screen.queryByTestId('approve-1')).not.toBeInTheDocument();
  });

  it('handles API error when fetching trips', async () => {
    // Override the default handler to return an error
    server.use(
      http.get('/api/business/trips', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<BusinessTripList />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText(/Failed to fetch trips/)).toBeInTheDocument();
    expect(screen.queryByTestId('business-trip-list')).not.toBeInTheDocument();
  });

  it('handles API error when approving trip', async () => {
    const user = userEvent.setup();

    // Override approve handler to return an error
    server.use(
      http.post('/api/business/trips/:id/approve', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<BusinessTripList />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Verify initial state
    expect(screen.getByTestId('status-1')).toHaveTextContent('pending');

    // Try to approve trip
    const approveButton = screen.getByTestId('approve-1');
    await user.click(approveButton);

    // Should show error message
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText(/Failed to approve trip/)).toBeInTheDocument();
  });

  it('displays empty state when no trips exist', async () => {
    // Override handler to return empty array
    server.use(
      http.get('/api/business/trips', () => {
        return HttpResponse.json([]);
      })
    );

    render(<BusinessTripList />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('no-trips')).toBeInTheDocument();
    expect(screen.getByText('No trips found')).toBeInTheDocument();
  });

  it('handles malformed API response', async () => {
    // Override handler to return invalid JSON
    server.use(
      http.get('/api/business/trips', () => {
        return new HttpResponse('invalid json', { 
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );

    render(<BusinessTripList />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText(/Unexpected token/)).toBeInTheDocument();
  });
});