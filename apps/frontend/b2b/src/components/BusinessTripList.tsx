import React, { useState, useEffect } from 'react';

interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: 'pending' | 'approved' | 'rejected';
  employeeId: string;
}

export const BusinessTripList: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/business/trips');
        if (!response.ok) {
          throw new Error('Failed to fetch trips');
        }
        const data = await response.json();
        setTrips(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const approveTrip = async (tripId: string) => {
    try {
      const response = await fetch(`/api/business/trips/${tripId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to approve trip');
      }

      // Update the trip status locally
      setTrips(prevTrips =>
        prevTrips.map(trip =>
          trip.id === tripId ? { ...trip, status: 'approved' as const } : trip
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve trip');
    }
  };

  if (loading) return <div data-testid="loading">Loading trips...</div>;
  if (error) return <div data-testid="error">Error: {error}</div>;

  return (
    <div data-testid="business-trip-list">
      <h2>Business Trip Requests</h2>
      {trips.length === 0 ? (
        <p data-testid="no-trips">No trips found</p>
      ) : (
        <div>
          {trips.map(trip => (
            <div key={trip.id} data-testid={`trip-${trip.id}`} className="trip-card">
              <h3>{trip.title}</h3>
              <p>Destination: {trip.destination}</p>
              <p>Budget: ${trip.budget}</p>
              <p>Status: <span data-testid={`status-${trip.id}`}>{trip.status}</span></p>
              <p>Employee: {trip.employeeId}</p>
              {trip.status === 'pending' && (
                <button
                  onClick={() => approveTrip(trip.id)}
                  data-testid={`approve-${trip.id}`}
                >
                  Approve Trip
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};