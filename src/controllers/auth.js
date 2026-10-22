/* eslint-disable space-before-function-paren */
import { AuthService } from '../services/auth.js'

export class AuthController {
  static async me(req, res) {
    const { user } = req
    if (!user) return res.status(401).json({ message: 'Error in user logged in' })
    res.status(200).json(user)
  }

  static async register(req, res, next) {
    const { name, email, password } = req.body
    try {
      const userCreated = await AuthService.register({ name, email, password })
      res.status(201).json({ message: 'success', userCreated })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body
    try {
      const userToken = await AuthService.login({ email, password })
      res.cookie('token', userToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Solo usar secure en producción
        sameSite: 'strict', // Evita el envío de cookies en solicitudes de terceros
        maxAge: 3600000 // 1 hora
      })
      res.status(200).json({ message: 'Login Succesful', token: userToken })
    } catch (error) {
      next(error)
    }
  }

  static async logout(_req, res) {
    res.clearCookie('token').json({ message: 'Logout succesful' })
  }
}
