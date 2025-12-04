import { Router } from "express";
import { CarUserController } from "./car-user.controller";

const router = Router();
const carUserController = new CarUserController();

// User car rental routes with limitations
router.post("/", carUserController.createCarRental);
// TODO: Implement missing controller methods
// router.get('/', carUserController.getCarRentals)
// router.get('/stats', carUserController.getCarRentalStats)
// router.get('/:rentalId', carUserController.getCarRentalDetails)
// router.post('/:rentalId/cancel', carUserController.cancelCarRental)
router.post("/:rentalId/payment", carUserController.processPayment);
router.post(
  "/:rentalId/resend-confirmation",
  carUserController.resendConfirmation
);

export default router;
