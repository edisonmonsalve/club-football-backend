import { Router } from 'express'
import { AuthController } from '../controllers/auth.js'
import { handleValidationErrors, loginValidator, registerValidator } from '../validators/auth.js'

export const authRouter = Router()

authRouter.post('/login', loginValidator, handleValidationErrors, AuthController.login)

authRouter.post('/register', registerValidator, handleValidationErrors, AuthController.register)

authRouter.post('/logout', AuthController.logout)
