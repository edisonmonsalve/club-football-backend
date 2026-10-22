import { Router } from 'express'
import { AuthController } from '../controllers/auth.js'
import { loginValidator, registerValidator } from '../validators/auth.js'
import { handleValidationErrors } from '../middlewares/handlerValidationErrors.js'
import { authenticateToken } from '../middlewares/auth.js'

export const authRouter = Router()

authRouter.get('/me', authenticateToken, handleValidationErrors, AuthController.me)

authRouter.post('/login', loginValidator, handleValidationErrors, AuthController.login)

authRouter.post('/register', registerValidator, handleValidationErrors, AuthController.register)

authRouter.post('/logout', AuthController.logout)
