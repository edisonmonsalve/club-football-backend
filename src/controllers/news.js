/* eslint-disable camelcase */
/* eslint-disable space-before-function-paren */
import { NewModel } from '../models/mysql/new.js'
import { ErrorResponse } from '../utils/errorResponse.js'

export class NewsControllers {
  static async getAll(req, res, next) {
    try {
      const news = await NewModel.getAll()
      res.status(200).json(news)
    } catch (error) {
      next(error)
      // res.status(500).json({ error: 'Database query failed' })
    }
  }

  static async getById(req, res, next) {
    const { id } = req.params
    try {
      const [newById] = await NewModel.getById({ id })
      if (newById) {
        res.status(200).json(newById)
      } else {
        throw new ErrorResponse('New not found', 404, 'NOT_FOUND')
        // res.status(404).json({ error: 'New not found' })
      }
    } catch (error) {
      next(error)
      // console.error('Error fetching new:', error)
      // res.status(500).json({ error: 'Error fetching new' })
    }
  }

  static async create(req, res, next) {
    const { title, content, image_url, author_id, category_id, state } = req.body
    try {
      const newId = await NewModel.create({ title, content, image_url, author_id, category_id, state })
      res.status(201).json({ message: 'New created', newId })
    } catch (error) {
      next(error)
      // console.error('Error creating new:', error)
      // res.status(500).json({ error: 'Error creating new' })
    }
  }

  static async update(req, res, next) {
    const { id } = req.params
    const { title, content, image_url, state } = req.body
    try {
      await NewModel.update({ id, title, content, image_url, state })
      res.status(200).json({ message: 'New updated' })
    } catch (error) {
      next(error)
      // console.error('Error updating new:', error)
      // res.status(500).json({ error: 'Error updating new' })
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params
    try {
      const eliminated = await NewModel.delete({ id })
      if (eliminated) {
        res.status(200).json({ message: 'New deleted' })
      } else {
        throw new ErrorResponse('New not exists', 400, 'NOT_EXISTS')
      }
    } catch (error) {
      next(error)
      // console.error('Error deleting new:', error)
      // res.status(500).json({ error: 'Error deleting new' })
    }
  }
}
