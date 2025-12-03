import React, { useState, useEffect } from 'react';

interface SearchFilters {
  destination?: string;
  startDate?: string;
  endDate?: string;
  maxPrice?: number;
  travelers?: number;
}

interface TravelPackage {
  id: string;
  title: string;
  destination: string;
  price: number;
  originalPrice?: number;
  duration: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  highlights: string[];
  availableDates: string[];
}

export const TravelSearchResults: React.FC = () => {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    destination: '',
    maxPrice: 5000,
    travelers: 1
  });

  const searchPackages = async (filters: SearchFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams();
      if (filters.destination) queryParams.append('destination', filters.destination);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
      if (filters.travelers) queryParams.append('travelers', filters.travelers.toString());
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);

      const response = await fetch(`/api/travel/search?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to search travel packages');
      }
      
      const data = await response.json();
      setPackages(data.packages || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (packageId: string) => {
    try {
      const isFavorited = favorites.has(packageId);
      const method = isFavorited ? 'DELETE' : 'POST';
      
      const response = await fetch(`/api/user/favorites/${packageId}`, {
        method,
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to update favorites');
      }

      setFavorites(prev => {
        const newFavorites = new Set(prev);
        if (isFavorited) {
          newFavorites.delete(packageId);
        } else {
          newFavorites.add(packageId);
        }
        return newFavorites;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update favorites');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchPackages(searchFilters);
  };

  useEffect(() => {
    // Load initial packages
    searchPackages({});
  }, []);

  return (
    <div data-testid="travel-search">
      <h1>Find Your Perfect Trip</h1>
      
      <form onSubmit={handleSearch} data-testid="search-form">
        <input
          type="text"
          placeholder="Where do you want to go?"
          value={searchFilters.destination || ''}
          onChange={(e) => setSearchFilters(prev => ({ ...prev, destination: e.target.value }))}
          data-testid="destination-input"
        />
        
        <input
          type="number"
          placeholder="Max Price"
          value={searchFilters.maxPrice || ''}
          onChange={(e) => setSearchFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) || undefined }))}
          data-testid="max-price-input"
        />
        
        <button type="submit" data-testid="search-button">
          Search
        </button>
      </form>

      {error && (
        <div data-testid="error" className="error">
          {error}
        </div>
      )}

      {loading && (
        <div data-testid="loading" className="loading">
          Searching for amazing trips...
        </div>
      )}

      <div data-testid="search-results">
        {packages.length === 0 && !loading ? (
          <div data-testid="no-results">
            No travel packages found. Try adjusting your search criteria.
          </div>
        ) : (
          <div className="packages-grid">
            {packages.map(pkg => (
              <div key={pkg.id} data-testid={`package-${pkg.id}`} className="package-card">
                <img src={pkg.imageUrl} alt={pkg.title} />
                <div className="package-content">
                  <h3 data-testid={`title-${pkg.id}`}>{pkg.title}</h3>
                  <p data-testid={`destination-${pkg.id}`}>{pkg.destination}</p>
                  <div className="pricing">
                    <span data-testid={`price-${pkg.id}`}>${pkg.price}</span>
                    {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                      <span data-testid={`original-price-${pkg.id}`} className="original-price">
                        ${pkg.originalPrice}
                      </span>
                    )}
                  </div>
                  <div data-testid={`rating-${pkg.id}`} className="rating">
                    {pkg.rating} stars ({pkg.reviews} reviews)
                  </div>
                  <p data-testid={`duration-${pkg.id}`}>{pkg.duration}</p>
                  
                  <button
                    onClick={() => toggleFavorite(pkg.id)}
                    data-testid={`favorite-${pkg.id}`}
                    className={favorites.has(pkg.id) ? 'favorited' : 'not-favorited'}
                  >
                    {favorites.has(pkg.id) ? '❤️ Favorited' : '🤍 Add to Favorites'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};