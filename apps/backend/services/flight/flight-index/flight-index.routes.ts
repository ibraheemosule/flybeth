import { Router } from 'express';
import { flightUserRoutes } from '../flight-user/flight-user.routes';
import { flightBusinessRoutes } from '../flight-business/flight-business.routes';

const router = Router();

// Mount user and business flight routes
router.use('/user', flightUserRoutes);
router.use('/business', flightBusinessRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Flight service is healthy',
    features: {
      user: '/api/flights/user/*',
      business: '/api/flights/business/*',
      shared: 'Shared flight search and data providers'
    }
  });
});

export default router;