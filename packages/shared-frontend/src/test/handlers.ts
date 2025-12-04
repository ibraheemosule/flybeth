import { http, HttpResponse } from "msw";

// Mock API handlers for testing
export const handlers = [
  // Auth endpoints
  http.post("/api/auth/login", ({ request }) => {
    return HttpResponse.json({
      success: true,
      data: {
        user: {
          id: "1",
          email: "test@example.com",
          role: "USER",
        },
        tokens: {
          accessToken: "mock-access-token",
          refreshToken: "mock-refresh-token",
        },
      },
    });
  }),

  http.post("/api/auth/register", ({ request }) => {
    return HttpResponse.json({
      success: true,
      data: {
        user: {
          id: "2",
          email: "newuser@example.com",
          role: "USER",
        },
        tokens: {
          accessToken: "mock-access-token",
          refreshToken: "mock-refresh-token",
        },
      },
    });
  }),

  http.post("/api/auth/logout", ({ request }) => {
    return HttpResponse.json({ success: true });
  }),

  // Travel search endpoints
  http.get("/api/travel/search", ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");

    if (type === "flights") {
      return HttpResponse.json({
        success: true,
        data: [
          {
            id: "flight-1",
            airline: "Mock Airlines",
            departure: "2024-01-15T10:00:00Z",
            arrival: "2024-01-15T14:00:00Z",
            price: 299.99,
            currency: "USD",
          },
        ],
      });
    }

    if (type === "hotels") {
      return HttpResponse.json({
        success: true,
        data: [
          {
            id: "hotel-1",
            name: "Mock Hotel",
            rating: 4.5,
            pricePerNight: 150.0,
            currency: "USD",
          },
        ],
      });
    }

    return HttpResponse.json({ success: true, data: [] });
  }),

  // User favorites
  http.post("/api/user/favorites/:id", ({ params }) => {
    return HttpResponse.json({
      success: true,
      message: `Added ${params.id} to favorites`,
    });
  }),

  http.delete("/api/user/favorites/:id", ({ params }) => {
    return HttpResponse.json({
      success: true,
      message: `Removed ${params.id} from favorites`,
    });
  }),

  // Fallback handler for unmatched requests
  http.all("*", ({ request }) => {
    console.warn(`Unhandled ${request.method} request to ${request.url}`);
    return HttpResponse.json({ error: "Endpoint not found" }, { status: 404 });
  }),
];
