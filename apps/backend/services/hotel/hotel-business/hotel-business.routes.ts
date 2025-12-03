import { Router } from 'express'
import { HotelBusinessController } from './hotel-business.controller'

const router = Router()
const hotelBusinessController = new HotelBusinessController()

// Business hotel routes with enhanced features
router.get('/search', hotelBusinessController.searchHotels)
router.get('/analytics', hotelBusinessController.getCorporateAnalytics)
router.get('/:hotelId', hotelBusinessController.getHotelDetails)
router.post('/reserve', hotelBusinessController.createReservation)
router.post('/bulk-booking', hotelBusinessController.createBulkBooking)
router.post('/request-custom-rates', hotelBusinessController.requestCustomRates)

export default router