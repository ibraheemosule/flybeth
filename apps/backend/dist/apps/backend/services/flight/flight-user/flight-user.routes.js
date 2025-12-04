"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flightUserRoutes = void 0;
const express_1 = require("express");
const flight_user_controller_1 = require("./flight-user.controller");
const router = (0, express_1.Router)();
exports.flightUserRoutes = router;
// User flight routes
router.get('/search', flight_user_controller_1.flightUserController.searchFlights.bind(flight_user_controller_1.flightUserController));
router.get('/:id', flight_user_controller_1.flightUserController.getFlightDetails.bind(flight_user_controller_1.flightUserController));
