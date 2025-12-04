"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotel_business_controller_1 = require("./hotel-business.controller");
const router = (0, express_1.Router)();
const hotelBusinessController = new hotel_business_controller_1.HotelBusinessController();
// Business hotel routes with enhanced features
router.get('/search', hotelBusinessController.searchHotels);
router.get('/analytics', hotelBusinessController.getCorporateAnalytics);
router.get('/:hotelId', hotelBusinessController.getHotelDetails);
router.post('/reserve', hotelBusinessController.createReservation);
router.post('/bulk-booking', hotelBusinessController.createBulkBooking);
router.post('/request-custom-rates', hotelBusinessController.requestCustomRates);
exports.default = router;
