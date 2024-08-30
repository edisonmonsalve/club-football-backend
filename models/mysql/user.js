/* eslint-disable space-before-function-paren */
import mysql from 'mysql2/promise'

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
}

const connection = await mysql.createConnection(config)

export class UserModel {
  static async getAll() {
    const [users] = await connection.query('SELECT * FROM users')

    return users
  }

  static async getById({ id }) {
    console.log('getById')
  }

  static async create({ input }) {
    console.log('create')
  }

  static async delete({ id }) {
    console.log('delete')
  }

  static async update({ id, input }) {
    console.log('update')
  }
}
