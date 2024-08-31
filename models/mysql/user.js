import { db } from '../../config/db.js'

export class UserModel {
  static async getAll () {
    const [users] = await db.query('SELECT * FROM users')

    return users
  }

  static async getById ({ id }) {
    console.log('getById')
  }

  static async create ({ input }) {
    console.log('create')
  }

  static async delete ({ id }) {
    console.log('delete')
  }

  static async update ({ id, input }) {
    console.log('update')
  }
}
