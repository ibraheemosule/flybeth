"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flightBusinessRoutes = void 0;
const express_1 = require("express");
const flight_business_controller_1 = require("./flight-business.controller");
const router = (0, express_1.Router)();
exports.flightBusinessRoutes = router;
// Business flight routes  
router.get('/search', flight_business_controller_1.flightBusinessController.searchFlights.bind(flight_business_controller_1.flightBusinessController));
router.get('/stats', flight_business_controller_1.flightBusinessController.getFlightStats.bind(flight_business_controller_1.flightBusinessController));
router.get('/:id', flight_business_controller_1.flightBusinessController.getFlightDetails.bind(flight_business_controller_1.flightBusinessController));
