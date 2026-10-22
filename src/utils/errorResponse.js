export class ErrorResponse extends Error {
  constructor (message, statusCode, code = undefined) {
    super(message, code)
    this.statusCode = statusCode
    this.code = code
    console.log(this.code)
  }
}
