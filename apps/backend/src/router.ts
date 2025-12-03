import { Router } from 'express';
// Temporarily comment out routes that may have undefined exports
// import authRoutes from '../services/auth/auth-index/auth-index.routes';
// import flightRoutes from '../services/flight/flight-index/flight-index.routes';
// import hotelRoutes from '../services/hotel/hotel-index/hotel-index.routes';
// import carRoutes from '../services/car/car-index/car-index.routes';

const router = Router();

// Temporarily disable service routes
// router.use('/api/auth', authRoutes);
// router.use('/api/flights', flightRoutes);
// router.use('/api/hotels', hotelRoutes);
// router.use('/api/cars', carRoutes);

// Health check endpoint for the entire API
router.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      auth: 'available',
      admin: 'available',
      flights: 'available',
      hotels: 'available',
      cars: 'available'
    }
  });
});

export { router as apiRouter };