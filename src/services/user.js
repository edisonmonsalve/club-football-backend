import { UserModel } from '../models/mysql/user.js'
import { ErrorResponse } from '../utils/errorResponse.js'
import bcrypt from 'bcrypt'

export class UserService {
  static async changePassword ({ id, oldPassword, newPassword }) {
    const user = await UserModel.getById({ id })
    if (!user) throw ErrorResponse('User no found', 404, 'NOT_FOUND')

    const match = await bcrypt.compare(oldPassword, user.password)
    if (!match) throw new ErrorResponse('Invalid credentials', 401, 'INVALID_CREDENTIALS')

    try {
      const hashPassword = await bcrypt.hash(newPassword, 10)
      const result = await UserModel.changePassword({ id, password: hashPassword })
      return result
    } catch (error) {
      throw new ErrorResponse(error.message, 500, error.code)
    }
  }
}
