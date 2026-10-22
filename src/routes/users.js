import { Router } from 'express'
import { UserControllers } from '../controllers/users.js'
import { authenticateToken, authorizeRoles } from '../middlewares/auth.js'

export const usersRouter = Router()

usersRouter.get('/', authenticateToken, authorizeRoles('admin'), UserControllers.getAll)
usersRouter.post('/', authenticateToken, authorizeRoles('admin'), UserControllers.create)

usersRouter.get('/:id', authenticateToken, authorizeRoles('admin'), UserControllers.getById)
usersRouter.patch('/:id', authenticateToken, authorizeRoles('admin'), UserControllers.update)
usersRouter.delete('/:id', authenticateToken, authorizeRoles('admin'), UserControllers.delete)

usersRouter.patch('/:id/change-password', authenticateToken, UserControllers.changePassword)
