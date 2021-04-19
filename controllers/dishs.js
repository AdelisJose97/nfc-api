const dishsRouter = require('express').Router()
const path = require('path')

// Midelwares
const credentialsExtractor = require('../midelwares/credentialsExtractor')

// Modelos
const Dish = require('../models/Dish')
const Category = require('../models/Category')

// Obtener los platos
dishsRouter.get('/', async (request, response, next) => {
  const dishes = await Dish.find({}).populate({ path: 'categoryId', select: 'name' })
  response.json(dishes)
})

// Crear un plato
dishsRouter.post('/', credentialsExtractor, async (request, response, next) => {
  const {
    name,
    price,
    description,
    categoryId
  } = request.body

  // Sacar UserId de request
  const { userId } = request
  let sampleFile
  let uploadPath

  if (request.files && Object.keys(request.files).length > 0) {
    try {
      sampleFile = request.files.image
      uploadPath = path.join('public', 'uploads', userId, 'products-images', sampleFile.name)
      await sampleFile.mv(uploadPath)
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  if (!name || !price || !description || !categoryId) {
    return response.status(400).json({
      error: 'dish content is missing'
    })
  }

  const newDish = new Dish({
    name,
    price,
    description,
    categoryId,
    image: uploadPath
  })
  try {
    const savedDish = await newDish.save()
    await Category.findByIdAndUpdate(categoryId, {
      $addToSet: {
        dishes: savedDish._id
      }
    }, { new: true })
    response.json(savedDish)
  } catch (error) {
    next(error)
  }
})

module.exports = dishsRouter
