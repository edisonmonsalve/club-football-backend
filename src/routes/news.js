import { Router } from 'express'
import { NewsControllers } from '../controllers/news.js'

export const newsRouter = Router()

newsRouter.get('/', NewsControllers.getAll)
newsRouter.post('/', NewsControllers.create)

newsRouter.get('/:id', NewsControllers.getById)
newsRouter.delete('/:id', NewsControllers.delete)
newsRouter.patch('/:id', NewsControllers.update)
