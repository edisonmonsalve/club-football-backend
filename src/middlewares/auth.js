import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ message: 'Access Denied' })

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' })
  }
}

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action' })
    }
    next()
  }
}
