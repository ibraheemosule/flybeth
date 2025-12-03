import { Router } from 'express'
import { CarBusinessController } from './car-business.controller'

const router = Router()
const bookingBusinessController = new CarBusinessController()

// Business booking routes with enhanced features
router.post('/', bookingBusinessController.createBooking)
router.post('/bulk', bookingBusinessController.createBulkBooking)
router.get('/', bookingBusinessController.getBookings)
router.get('/analytics', bookingBusinessController.getBookingAnalytics)
router.get('/reports', bookingBusinessController.generateReport)
router.get('/:bookingId', bookingBusinessController.getBookingDetails)
router.post('/:bookingId/cancel', bookingBusinessController.cancelBooking)
router.post('/:bookingId/payment', bookingBusinessController.processPayment)
router.post('/:bookingId/approve', bookingBusinessController.approveBooking)
router.post('/:bookingId/modify', bookingBusinessController.modifyBooking)

export default router