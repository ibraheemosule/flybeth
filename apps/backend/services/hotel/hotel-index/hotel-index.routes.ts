import { Router } from 'express'
import hotelUserRoutes from '../hotel-user/hotel-user.routes'
import hotelBusinessRoutes from '../hotel-business/hotel-business.routes'

const router = Router()

// Mount feature-specific routes
router.use('/user', hotelUserRoutes)
router.use('/business', hotelBusinessRoutes)

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    service: 'hotel-service',
    message: 'Hotel service is running',
    timestamp: new Date().toISOString(),
    features: {
      user: 'Individual bookings with user-friendly pricing',
      business: 'Corporate bookings with volume discounts'
    }
  })
})

export default router