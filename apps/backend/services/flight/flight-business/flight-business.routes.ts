import { Router } from 'express';
import { flightBusinessController } from './flight-business.controller';

const router = Router();

// Business flight routes  
router.get('/search', flightBusinessController.searchFlights.bind(flightBusinessController));
router.get('/stats', flightBusinessController.getFlightStats.bind(flightBusinessController));
router.get('/:id', flightBusinessController.getFlightDetails.bind(flightBusinessController));

export { router as flightBusinessRoutes };