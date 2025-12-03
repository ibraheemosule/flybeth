import { Router } from 'express';
import { flightUserController } from './flight-user.controller';

const router = Router();

// User flight routes
router.get('/search', flightUserController.searchFlights.bind(flightUserController));
router.get('/:id', flightUserController.getFlightDetails.bind(flightUserController));

export { router as flightUserRoutes };