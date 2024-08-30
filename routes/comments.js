import { Router } from 'express'
import { CommentsControllers } from '../controllers/comments.js'

export const commentsRouter = Router()

commentsRouter.get('/', CommentsControllers.getAll)
commentsRouter.post('/', CommentsControllers.create)

commentsRouter.get('/:id', CommentsControllers.getById)
commentsRouter.delete('/:id', CommentsControllers.delete)
commentsRouter.patch('/:id', CommentsControllers.update)
