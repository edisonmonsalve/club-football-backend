import { Router } from 'express'
import { UserControllers } from '../controllers/users.js'

export const usersRouter = Router()

usersRouter.get('/', UserControllers.getAll)
usersRouter.post('/', UserControllers.create)

usersRouter.get('/:id', UserControllers.getById)
usersRouter.delete('/:id', UserControllers.delete)
usersRouter.patch('/:id', UserControllers.update)
