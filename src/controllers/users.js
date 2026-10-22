/* eslint-disable space-before-function-paren */
/* eslint-disable camelcase */
import { UserModel } from '../models/mysql/user.js'
import { UserService } from '../services/user.js'
import { ErrorResponse } from '../utils/errorResponse.js'

export class UserControllers {
  static async getAll(req, res, next) {
    try {
      const users = await UserModel.getAll()
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  static async getById(req, res, next) {
    const { id } = req.params
    try {
      const user = await UserModel.getById({ id })
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      next(error)
    }
  }

  static async create(req, res, next) {
    const { name, email, password } = req.body
    try {
      const userId = await UserModel.create({ name, email, password })
      res.status(201).json({ message: 'User created', userId })
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    const { id } = req.params
    const { role_id, name, email, password } = req.body
    try {
      const result = await UserModel.update({ id, role_id, name, email, password })
      res.status(200).json({ message: 'User updated', result })
    } catch (error) {
      next(error)
    }
  }

  static async changePassword(req, res, next) {
    const { id } = req.params
    const { oldPassword, newPassword } = req.body
    try {
      const result = await UserService.changePassword({ id, oldPassword, newPassword })
      res.status(200).json({ success: true, message: 'password changed succesfull', result })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params
    try {
      const eliminated = await UserModel.delete({ id })
      if (eliminated) {
        res.status(200).json({ success: true, message: 'User deleted succesfull' })
      } else {
        throw new ErrorResponse('User not exists', 404, 'NOT_EXISTS')
      }
    } catch (error) {
      next(error)
    }
  }
}
