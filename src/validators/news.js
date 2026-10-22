import { body, validationResult } from 'express-validator'

export const createNewValidator = [
  body('title').trim().escape().isString(),
  body('content').notEmpty(),
  body('image').optional(),
  body('author_id').isInt(),
  body('category_id').isInt(),
  body('state').isIn(['activa', 'pendiente', 'archivada'])
]
