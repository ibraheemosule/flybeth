import { Router } from 'express'
import { HotelUserController } from './hotel-user.controller'

const router = Router()
const hotelUserController = new HotelUserController()

// User hotel routes with limitations
router.get('/search', hotelUserController.searchHotels)
router.get('/popular', hotelUserController.getPopularHotels)
router.get('/amenities', hotelUserController.getAmenities)
router.get('/:hotelId', hotelUserController.getHotelDetails)
router.get('/:hotelId/availability', hotelUserController.checkAvailability)
router.post('/reserve', hotelUserController.createReservation)

export default router