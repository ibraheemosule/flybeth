import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { TravelSearchResults } from '../components/TravelSearchResults';

// Mock travel packages data
const mockPackages = [
  {
    id: '1',
    title: 'Tropical Paradise in Bali',
    destination: 'Bali, Indonesia',
    price: 1200,
    originalPrice: 1500,
    duration: '7 days, 6 nights',
    rating: 4.8,
    reviews: 324,
    imageUrl: '/images/bali.jpg',
    highlights: ['Beach Resort', 'Cultural Tours', 'Spa Included'],
    availableDates: ['2024-01-15', '2024-02-10', '2024-03-05']
  },
  {
    id: '2', 
    title: 'European Adventure',
    destination: 'Paris, France',
    price: 2800,
    duration: '10 days, 9 nights',
    rating: 4.6,
    reviews: 156,
    imageUrl: '/images/paris.jpg',
    highlights: ['City Tours', 'Museums', 'Fine Dining'],
    availableDates: ['2024-04-20', '2024-05-15']
  },
  {
    id: '3',
    title: 'Safari Adventure',
    destination: 'Kenya',
    price: 4500,
    duration: '12 days, 11 nights', 
    rating: 4.9,
    reviews: 89,
    imageUrl: '/images/kenya.jpg',
    highlights: ['Wildlife Safari', 'Local Guides', 'Luxury Lodge'],
    availableDates: ['2024-06-10', '2024-07-25']
  }
];

// Set up MSW server
const server = setupServer(
  // Default search handler
  http.get('/api/travel/search', ({ request }) => {
    const url = new URL(request.url);
    const destination = url.searchParams.get('destination');
    const maxPrice = url.searchParams.get('maxPrice');
    
    let filteredPackages = [...mockPackages];
    
    // Filter by destination
    if (destination && destination.trim()) {
      filteredPackages = filteredPackages.filter(pkg =>
        pkg.destination.toLowerCase().includes(destination.toLowerCase())
      );
    }
    
    // Filter by max price
    if (maxPrice) {
      const maxPriceNum = parseInt(maxPrice);
      filteredPackages = filteredPackages.filter(pkg => pkg.price <= maxPriceNum);
    }
    
    return HttpResponse.json({ packages: filteredPackages });
  }),

  // Favorites handlers
  http.post('/api/user/favorites/:id', ({ params }) => {
    return HttpResponse.json({ 
      success: true, 
      message: `Package ${params.id} added to favorites` 
    });
  }),

  http.delete('/api/user/favorites/:id', ({ params }) => {
    return HttpResponse.json({ 
      success: true, 
      message: `Package ${params.id} removed from favorites` 
    });
  })
);

describe('TravelSearchResults Component', () => {
  beforeEach(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('loads and displays initial travel packages', async () => {
    render(<TravelSearchResults />);

    // Wait for packages to load
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Check that packages are displayed
    expect(screen.getByTestId('travel-search')).toBeInTheDocument();
    expect(screen.getByText('Tropical Paradise in Bali')).toBeInTheDocument();
    expect(screen.getByText('European Adventure')).toBeInTheDocument();
    expect(screen.getByText('Safari Adventure')).toBeInTheDocument();

    // Check package details
    expect(screen.getByTestId('price-1')).toHaveTextContent('$1200');
    expect(screen.getByTestId('original-price-1')).toHaveTextContent('$1500');
    expect(screen.getByTestId('rating-1')).toHaveTextContent('4.8 stars (324 reviews)');
    expect(screen.getByTestId('destination-1')).toHaveTextContent('Bali, Indonesia');
  });

  it('filters packages by destination', async () => {
    const user = userEvent.setup();
    render(<TravelSearchResults />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Search for Paris
    const destinationInput = screen.getByTestId('destination-input');
    await user.clear(destinationInput);
    await user.type(destinationInput, 'Paris');
    await user.click(screen.getByTestId('search-button'));

    // Wait for search results
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Should only show Paris package
    expect(screen.getByText('European Adventure')).toBeInTheDocument();
    expect(screen.queryByText('Tropical Paradise in Bali')).not.toBeInTheDocument();
    expect(screen.queryByText('Safari Adventure')).not.toBeInTheDocument();
  });

  it('filters packages by maximum price', async () => {
    const user = userEvent.setup();
    render(<TravelSearchResults />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Set max price to $2000
    const maxPriceInput = screen.getByTestId('max-price-input');
    await user.clear(maxPriceInput);
    await user.type(maxPriceInput, '2000');
    await user.click(screen.getByTestId('search-button'));

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Should only show packages under $2000
    expect(screen.getByText('Tropical Paradise in Bali')).toBeInTheDocument();
    expect(screen.queryByText('European Adventure')).not.toBeInTheDocument();
    expect(screen.queryByText('Safari Adventure')).not.toBeInTheDocument();
  });

  it('handles adding and removing favorites', async () => {
    const user = userEvent.setup();
    render(<TravelSearchResults />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    const favoriteButton = screen.getByTestId('favorite-1');
    
    // Initially not favorited
    expect(favoriteButton).toHaveTextContent('🤍 Add to Favorites');
    expect(favoriteButton).toHaveClass('not-favorited');

    // Add to favorites
    await user.click(favoriteButton);

    await waitFor(() => {
      expect(favoriteButton).toHaveTextContent('❤️ Favorited');
      expect(favoriteButton).toHaveClass('favorited');
    });

    // Remove from favorites
    await user.click(favoriteButton);

    await waitFor(() => {
      expect(favoriteButton).toHaveTextContent('🤍 Add to Favorites');
      expect(favoriteButton).toHaveClass('not-favorited');
    });
  });

  it('shows loading state during search', async () => {
    const user = userEvent.setup();

    // Delay the response to test loading state
    server.use(
      http.get('/api/travel/search', async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return HttpResponse.json({ packages: [] });
      })
    );

    render(<TravelSearchResults />);

    const searchButton = screen.getByTestId('search-button');
    await user.click(searchButton);

    // Should show loading state
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Searching for amazing trips...')).toBeInTheDocument();

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
  });

  it('handles search API errors', async () => {
    const user = userEvent.setup();

    // Override handler to return error
    server.use(
      http.get('/api/travel/search', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<TravelSearchResults />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText(/Failed to search travel packages/)).toBeInTheDocument();
  });

  it('handles favorites API errors', async () => {
    const user = userEvent.setup();

    // Override favorites handler to return error
    server.use(
      http.post('/api/user/favorites/:id', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<TravelSearchResults />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Try to add favorite
    const favoriteButton = screen.getByTestId('favorite-1');
    await user.click(favoriteButton);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText(/Failed to update favorites/)).toBeInTheDocument();
  });

  it('shows no results message when search returns empty', async () => {
    const user = userEvent.setup();

    // Override handler to return empty results
    server.use(
      http.get('/api/travel/search', () => {
        return HttpResponse.json({ packages: [] });
      })
    );

    render(<TravelSearchResults />);

    // Search for something that won't match
    const destinationInput = screen.getByTestId('destination-input');
    await user.type(destinationInput, 'Nonexistent Place');
    await user.click(screen.getByTestId('search-button'));

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('no-results')).toBeInTheDocument();
    expect(screen.getByText('No travel packages found. Try adjusting your search criteria.')).toBeInTheDocument();
  });

  it('handles malformed API responses gracefully', async () => {
    // Override handler to return malformed JSON
    server.use(
      http.get('/api/travel/search', () => {
        return new HttpResponse('invalid json', {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );

    render(<TravelSearchResults />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText(/Unexpected token/)).toBeInTheDocument();
  });
});