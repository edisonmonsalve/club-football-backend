import { validationResult } from 'express-validator'

// Middleware to handle validation results
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Ivalid data provided', errors: errors.array() })
  }
  next()
}
