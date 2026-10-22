/* eslint-disable camelcase */
/* eslint-disable space-before-function-paren */
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/mysql/user.js'
import { ErrorResponse } from '../utils/errorResponse.js'

export class AuthService {
  static async register({ name, email, password }) {
    const user = await UserModel.getByEmail({ email })
    if (user) throw new ErrorResponse('User already exists', 409, 'ALREADY_EXISTS')

    try {
      const passwordHash = await bcrypt.hash(password, 10)
      const userId = await UserModel.create({ name, email, password: passwordHash })
      return { id: userId, name, email }
    } catch (error) {
      throw new ErrorResponse(error.message, undefined, error.code)
    }
  }

  static async login({ email, password }) {
    const user = await UserModel.getByEmail({ email })
    if (!user) throw new ErrorResponse('User not found', 404, 'NOT_FOUND')

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new ErrorResponse('Invalid credentials', 401, 'INVALID_CREDENTIALS')

    try {
      const { id, name, email, role } = user
      const token = jwt.sign({ id, role, name, email }, process.env.JWT_SECRET, { expiresIn: '1h' })
      return token
    } catch (error) {
      throw new ErrorResponse(error.message, 400, error.code)
    }
  }
}
