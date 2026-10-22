export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'An internal server error occurred'

  // console.error('ERROR CODE:', err.code)
  // next()

  if (process.env.NODE_ENV === 'development') {
    // Mostrar detalles en desarrollo
    return res.status(statusCode).json({
      success: false,
      message,
      code: err.code,
      stack: err.stack
    })
  } else {
    // Respuesta más genérica en producción
    return res.status(statusCode).json({
      success: false,
      message
    })
  }
}
