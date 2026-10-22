/* eslint-disable camelcase */
/* eslint-disable space-before-function-paren */
import { db } from '../../config/dbConfig.js'
import { ErrorResponse } from '../../utils/errorResponse.js'

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
    const [result] = await db.query('INSERT INTO news (title, content, image_url, author_id, category_id, state) VALUES (?,?,?,?,?,?)',
      [title, content, image_url, author_id, category_id, state])
    return result.insertId
  }

  static async update({ id, ...input }) {
    throw new ErrorResponse(undefined, undefined, 'ECONNREFUSED')
  }

  static async delete({ id }) {
    // try {
    const [result] = await db.query('DELETE FROM news WHERE id = ?', [id])
    return result.affectedRows
    // } catch (error) {
    //   throw new ErrorResponse('Error deleting new', 500, error.code)
    // }
  }
}
