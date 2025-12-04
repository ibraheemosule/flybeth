"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const car_user_controller_1 = require("./car-user.controller");
const router = (0, express_1.Router)();
const carUserController = new car_user_controller_1.CarUserController();
// User car rental routes with limitations
router.post("/", carUserController.createCarRental);
// TODO: Implement missing controller methods
// router.get('/', carUserController.getCarRentals)
// router.get('/stats', carUserController.getCarRentalStats)
// router.get('/:rentalId', carUserController.getCarRentalDetails)
// router.post('/:rentalId/cancel', carUserController.cancelCarRental)
router.post("/:rentalId/payment", carUserController.processPayment);
router.post("/:rentalId/resend-confirmation", carUserController.resendConfirmation);
exports.default = router;
