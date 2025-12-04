"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const car_business_controller_1 = require("./car-business.controller");
const router = (0, express_1.Router)();
const carBusinessController = new car_business_controller_1.CarBusinessController();
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
exports.default = router;
