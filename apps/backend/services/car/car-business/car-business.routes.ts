import { Router } from "express";
import { CarBusinessController } from "./car-business.controller";

const router = Router();
const carBusinessController = new CarBusinessController();

// Business car rental routes with enhanced features
// TODO: Implement missing controller methods and fix method naming
// router.post('/', carBusinessController.createCarRental)
router.post("/bulk", carBusinessController.createBulkBooking);
router.get("/", carBusinessController.getBookings);
router.get("/analytics", carBusinessController.getBookingAnalytics);
// router.get('/reports', carBusinessController.generateReport)
// router.get('/:bookingId', carBusinessController.getBookingDetails)
// router.post('/:bookingId/cancel', carBusinessController.cancelBooking)
// router.post('/:bookingId/payment', carBusinessController.processPayment)
// router.post('/:bookingId/approve', carBusinessController.approveBooking)
// router.post('/:bookingId/modify', carBusinessController.modifyBooking)

export default router;
