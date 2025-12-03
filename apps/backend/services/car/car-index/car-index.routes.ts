import { Router } from 'express'
import carUserRoutes from '../car-user/car-user.routes'
import carBusinessRoutes from '../car-business/car-business.routes'

const router = Router()

// Mount feature-specific routes
router.use('/user', carUserRoutes)
router.use('/business', carBusinessRoutes)

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    service: 'car-service',
    message: 'Car rental service is running',
    timestamp: new Date().toISOString(),
    features: {
      user: 'Individual car rentals with 2 driver limit and $1.5k value cap',
      business: 'Corporate car rentals with bulk features and unlimited value'
    }
  })
})

export default router