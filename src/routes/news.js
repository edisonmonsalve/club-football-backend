import { Router } from 'express'
import { NewsControllers } from '../controllers/news.js'
import { createNewValidator } from '../validators/news.js'
import { handleValidationErrors } from '../middlewares/handlerValidationErrors.js'
import { authenticateToken, authorizeRoles } from '../middlewares/auth.js'

export const newsRouter = Router()

newsRouter.get('/', NewsControllers.getAll)
newsRouter.post('/', authenticateToken, authorizeRoles('admin', 'editor'), createNewValidator, handleValidationErrors, NewsControllers.create)

newsRouter.get('/:id', NewsControllers.getById)
newsRouter.delete('/:id', authenticateToken, authorizeRoles('admin'), NewsControllers.delete)
newsRouter.patch('/:id', authenticateToken, authorizeRoles('admin', 'editor'), NewsControllers.update)
