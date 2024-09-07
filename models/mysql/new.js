/* eslint-disable camelcase */
/* eslint-disable space-before-function-paren */
import { db } from '../../config/db.js'

export class NewModel {
  static async getAll() {
    const [news] = await db.query('SELECT * FROM news')
    return news
  }

  static async getById({ id }) {
    const [newById] = await db.query('SELECT * FROM news WHERE id = ?', [id])
    return newById
  }

  static async create({ title, content, image_url, author_id, category_id, state }) {
    try {
      const [result] = await db.query('INSERT INTO news (title, content, image_url, author_id, category_id, state) VALUES (?,?,?,?,?,?)',
        [title, content, image_url, author_id, category_id, state])
      return result.insertId
    } catch (error) {
      console.error(error)
      throw new Error('Erorr')
    }
  }

  static async update({ id, ...input }) {
    console.log(id, input)
    console.log('update')
  }

  static async delete({ id }) {
    try {
      const [result] = await db.query('DELETE FROM news WHERE id = ?', [id])
      return result.affectedRows
    } catch (error) {
      throw new Error('Error deleting new')
    }
  }
}
