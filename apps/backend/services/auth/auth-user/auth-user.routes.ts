import { Router } from 'express'
import { UserController } from './auth-user.controller'

const router = Router()
const userController = new UserController()

router.post('/register', userController.register)
router.post('/login', userController.login)

export const userRoutes = router
export default router