"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotel_user_controller_1 = require("./hotel-user.controller");
const router = (0, express_1.Router)();
const hotelUserController = new hotel_user_controller_1.HotelUserController();
// User hotel routes with limitations
router.get('/search', hotelUserController.searchHotels);
router.get('/popular', hotelUserController.getPopularHotels);
router.get('/amenities', hotelUserController.getAmenities);
router.get('/:hotelId', hotelUserController.getHotelDetails);
router.get('/:hotelId/availability', hotelUserController.checkAvailability);
router.post('/reserve', hotelUserController.createReservation);
exports.default = router;
