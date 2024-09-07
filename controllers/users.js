/* eslint-disable space-before-function-paren */
/* eslint-disable camelcase */
import { UserModel } from '../models/mysql/user.js'

export class UserControllers {
  static async getAll(req, res) {
    try {
      const users = await UserModel.getAll()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ error: 'Database query failed' })
    }
  }

  static async getById(req, res) {
    const { id } = req.params
    try {
      const [user] = await UserModel.getById({ id })
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      res.status(500).json({ error: 'Error fetching user' })
    }
  }

  static async create(req, res) {
    const { name, email, password } = req.body
    try {
      const userId = await UserModel.create({ name, email, password })
      res.status(201).json({ message: 'User created', userId })
    } catch (error) {
      console.error('Error creating user:', error)
      res.status(500).json({ error: 'Error creating user' })
    }
  }

  static async update(req, res) {
    const { id } = req.params
    const { role_id, name, email, password } = req.body
    try {
      await UserModel.update({ id, role_id, name, email, password })
      res.status(200).json({ message: 'User updated' })
    } catch (error) {
      console.error('Error updating user:', error)
      res.status(500).json({ error: 'Error updating user' })
    }
  }

  static async delete(req, res) {
    const { id } = req.params
    try {
      const eliminated = await UserModel.delete({ id })
      if (eliminated) {
        res.status(200).json({ message: 'User deleted' })
      } else {
        res.status(400).json({ error: 'User not exits' })
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      res.status(500).json({ error: 'Error deleting user' })
    }
  }
}
