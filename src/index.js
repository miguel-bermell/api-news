require('dotenv').config()
require('./config/mongo')
const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')

const { health, news } = require('./routes')
const { notFound, errorHandler } = require('./middlewares')

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', health)
app.use('/news', news)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = { app, server }
