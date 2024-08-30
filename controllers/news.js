export class NewsControllers {
  static async getAll (req, res) {
    res.json('getAll')
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
