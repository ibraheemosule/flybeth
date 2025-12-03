import { Router } from 'express'
import { AdminController } from './auth-admin.controller'

const router = Router()
const adminController = new AdminController()

router.post('/login', adminController.login)
router.post('/google-auth', adminController.googleAuth)

export const adminRoutes = router
export default router