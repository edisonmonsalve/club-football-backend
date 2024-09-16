/* eslint-disable space-before-function-paren */
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/mysql/user.js'

export class AuthService {
  static async register({ name, email, password }) {
    const user = await UserModel.getByEmail({ email })
    console.log('user', user)
    if (user) throw new Error('User already exists')

    const passwordHash = await bcrypt.hash(password, 10)
    try {
      const userId = await UserModel.create({ name, email, passwordHash })
      console.log(userId, '<<<<<<')
      return { id: userId, name, email }
    } catch (error) {
      console.log(error.code)
      throw new Error(error.code)
    }
  }

  static async login({ email, password }) {
    const user = await UserModel.getByEmail({ email })
    if (!user) throw new Error('User not found')

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new Error('Invalid credentials')

    try {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
      // console.log('token: ', token)
      return token
    } catch (error) {
      throw new Error('Error token')
    }
  }

  static async logout(token) {
    console.log('logoout', token)
  }
}
