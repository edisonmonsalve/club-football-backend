/* eslint-disable space-before-function-paren */
import { db } from '../../config/dbConfig.js'

export class UserModel {
  static async getAll() {
    const [users] = await db.query('SELECT * FROM users')
    return users
  }

  static async getById({ id }) {
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id])
    return user[0]
  }

  static async getByEmail({ email }) {
    const [user] = await db.query(`SELECT u.id, u.role_id, r.title as role, u.name, u.email, u.password 
        FROM users u
        JOIN roles r ON r.id = u.role_id 
        WHERE u.email = ?; `, [email])
    return user[0]
  }

  static async create({ name, email, password }) {
    const [result] = await db.query('INSERT INTO users (name, email, password) VALUES (?,?,?)',
      [name, email, password])
    return result.insertId
  }

  static async update({ id, ...input }) {
    const fields = Object.keys(input)
      .filter(key => input[key] !== undefined)
      .map(key => `${key} = ?`)
      .join(', ')
    const values = Object.keys(input)
      .filter(key => input[key] !== undefined)
      .map(key => input[key])

    if (fields.length === 0) {
      throw new Error('No valid fields provided for update')
    }

    values.push(id)
    const query = `UPDATE users SET ${fields} WHERE id = ?`
    await db.query(query, values)
  }

  static async changePassword({ id, password }) {
    console.log(id, password)
    const result = await db.query('UPDATE users SET password = ? WHERE id = ?', [password, id])
    console.table(result)
    return result
  }

  static async delete({ id }) {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id])
    return result.affectedRows
  }
}
