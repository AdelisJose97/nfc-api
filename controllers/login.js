const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
/* const User = require('../models/User') */
const Restaurant = require('../models/Restaurant')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body
  console.log(username, password)

  const restaurant = await Restaurant.findOne({ username })
  const passwordCorrect = restaurant === null
    ? false
    : await bcrypt.compare(password, restaurant.passwordHash)
  if (!(restaurant && passwordCorrect)) {
    response.status(401).json({
      error: 'Invalid user or password'
    })
  }

  const restaurantForToken = {
    _id: restaurant._id,
    username: restaurant.username
  }

  const token = jwt.sign(restaurantForToken, process.env.SECRET)

  response.send({
    name: restaurant.name,
    username: restaurant.username,
    token
  })
})

module.exports = loginRouter
