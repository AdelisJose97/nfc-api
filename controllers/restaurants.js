const restaurantsRouter = require('express').Router()
const bcrypt = require('bcrypt')

const Restaurant = require('../models/Restaurant')

// Obtener todos los restaurantes
restaurantsRouter.get('/', async (request, response) => {
  const restaurants = await Restaurant.find({}).populate({ path: 'services', select: 'name' })
  response.json(restaurants)
})
// Crear un restaurant
restaurantsRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, name, password } = body

  const passwordHash = await bcrypt.hash(password, 10)

  const restaurant = new Restaurant({
    username,
    name,
    passwordHash
  })

  const savedRestaurant = await restaurant.save()
  response.json(savedRestaurant)
})

module.exports = restaurantsRouter
