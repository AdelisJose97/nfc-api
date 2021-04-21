const servicesRouter = require('express').Router()
const credentialsExtractor = require('../midelwares/credentialsExtractor')

// Modelos
const Service = require('../models/Service')
const Restaurant = require('../models/Restaurant')

// Obtener todos los servicios
servicesRouter.get('/', async (request, response, next) => {
  const services = await Service.find({}).populate({ path: 'categories', select: 'name' })
  response.json(services)
})

// Crear un nuevo servicio
servicesRouter.post('/', credentialsExtractor, async (request, response, next) => {
  const { name } = request.body
  const { userId } = request
  const newService = new Service({ name })
  try {
    const savedService = await newService.save()
    await Restaurant.findByIdAndUpdate(userId, {
      $addToSet: {
        services: savedService._id
      }
    }, { new: true })
    response.json(savedService)
  } catch (error) {
    next(error)
  }
})

module.exports = servicesRouter
