require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

// File upload
const fileUpload = require('express-fileupload')
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  createParentPath: true
}))

// Modelos
/* const User = require('./models/User') */

// Midelwares
const notFound = require('./midelwares/nofFound')
const handleError = require('./midelwares/handleError')
/* const userExtractor = require('./midelwares/userExtractor') */

// Controladores
/* const usersRouter = require('./controllers/users') */
const loginRouter = require('./controllers/login')
const restaurantsRouter = require('./controllers/restaurants')
const dishsRouter = require('./controllers/dishs')
const categoriesRouter = require('./controllers/categories')

app.get('/', (request, response) => {
  response.send('<h1>Hello Word</h1>')
})

/* app.use('/api/users', usersRouter) */
app.use('/api/login', loginRouter)
app.use('/api/restaurants', restaurantsRouter)
app.use('/api/dishs', dishsRouter)
app.use('/api/categories', categoriesRouter)

app.use(notFound)
app.use(handleError)

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
