import { UserModel } from '../models/mysql/user.js'

export class UserControllers {
  static async getAll (req, res) {
    try {
      const users = await UserModel.getAll()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ error: 'Database query failed' })
    }
  }

  static async getById (req, res) {
    console.log(req.params)
    res.json('getById')
  }

  static async create (req, res) {
    res.json('create')
  }

  static async delete (req, res) {
    res.json('delete')
  }

  static async update (req, res) {
    res.json('update')
  }
}
