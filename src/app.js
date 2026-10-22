import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'

import { usersRouter } from './routes/users.js'
import { newsRouter } from './routes/news.js'
import { commentsRouter } from './routes/comments.js'
import { authRouter } from './routes/auth.js'
import { errorHandler } from './middlewares/errorHandler.js'

const app = express()
app.use(cookieParser())
app.use(cors())
app.use(json()) // for parsing application/json for default
app.use(morgan('dev'))
app.disable('x-powered-by')

// app.use((req, res, next) => {
//   console.log(req.cookies)
//   next()
// })

app.use('/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/news', newsRouter)
app.use('/api/comments', commentsRouter)

app.use((req, res) => {
  res.status(404).send(`<h1>Path: <mark>${req.url}</mark> Not Fount 404</h1>`)
})

// Middleware de manejo de errores global
app.use(errorHandler)

const PORT = process.env.PORT ?? 3000
const HOST_NAME = process.env.PORT ?? 'localhost'
app.listen(PORT, HOST_NAME, console.log('Server running! http://localhost:' + PORT))

// // Manejar el cierre de la aplicación
// process.on('SIGINT', () => {
//   db.end()
//     .then(() => {
//       console.log('Pool de conexiones cerrado')
//       process.exit(0)
//     })
//     .catch(err => {
//       console.error('Error cerrando el pool de conexiones:', err)
//       process.exit(1)
//     })
// })
