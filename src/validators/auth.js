import { body, validationResult } from 'express-validator'

export const loginValidator = [
  body('email').trim().isEmail().withMessage('Enter a valid email'),
  body('password').trim().isLength({ min: 6 }).withMessage('Password should be at least 6 chars')
]

export const registerValidator = [
  body('name').trim().isString().escape().withMessage('Names must be a string').isLength({ min: 3 }).withMessage('Name must be minimum 3+ characters long'),
  body('email').trim().isEmail().withMessage('Enter a valid email'),
  body('password').trim().isLength({ min: 6 }).withMessage('Password must be minimum 6+ characters long')
]

export const logoutValidator = []
