import { Router } from 'express'
import { BusinessController } from './auth-business.controller'

const router = Router()
const businessController = new BusinessController()

router.post('/register', businessController.register)
router.post('/login', businessController.login)

export const businessRoutes = router
export default router