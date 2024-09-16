/* eslint-disable space-before-function-paren */
import { AuthService } from '../services/auth.js'

export class AuthController {
  static async register(req, res) {
    const { name, email, password } = req.body
    try {
      const userCreated = await AuthService.register({ name, email, password })
      // console.log('>>>>>', result)
      res.status(201).json({ message: 'success', userCreated })
    } catch (error) {
      console.log('ERROR CODE ?? ? ? ? ? ?¿', error.code)
      if (error.message === 'User already exists') {
        return res.status(400).json({ error: 'User already exist' })
      }
      res.status(500).json({ error: 'Error creating user' })
    }
  }

  static async login(req, res) {
    const { email, password } = req.body
    try {
      const userToken = await AuthService.login({ email, password })
      res.status(200).json({ message: 'Succes Login', userToken })
    } catch (error) {
      console.log(error)
      if (error.message === 'User not found' || error.message === 'Invalid credentials') {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Error login user' })
      }
    }
  }

  static async logout(req, res) {
    console.log(req)
    res.json({ logout: 'world' })
  }
}
