const restaurantsRouter = require('express').Router()
const bcrypt = require('bcrypt')

const Restaurant = require('../models/Restaurant')

restaurantsRouter.get('/', async (request, response) => {
  const restaurants = await Restaurant.find({}).populate('notes', {
    content: 1,
    date: 1
  })
  response.json(restaurants)
})

restaurantsRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, name, password } = body

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new Restaurant({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = restaurantsRouter
