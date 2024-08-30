import express, { json } from 'express'
import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import { usersRouter } from './routes/users.js'
import { newsRouter } from './routes/news.js'
import { commentsRouter } from './routes/comments.js'

const app = express()
app.use(cors())
app.use(json()) // for parsing application/json for default
app.use(morgan('dev'))
app.disable('x-powered-by')

app.use('/users', usersRouter)
app.use('/news', newsRouter)
app.use('/comments', commentsRouter)

app.use((req, res) => {
  res.status(404).send(`<h1>Path: <mark>${req.url}</mark> Not Fount 404</h1>`)
})

// console.log(process.env)
const PORT = process.env.PORT ?? 3000
const HOST_NAME = process.env.PORT ?? 'localhost'
app.listen(PORT, HOST_NAME, console.log('Server running! http://localhost:' + PORT))
