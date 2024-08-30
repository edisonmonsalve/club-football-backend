import { UserModel } from '../models/mysql/user.js'

export class UserControllers {
  static async getAll (req, res) {
    const data = await UserModel.getAll()
    res.json(data)
  }

  static async getById (req, res) {
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
