export class CommentModel {
  static async getAll () {
    console.log('getAll')
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
