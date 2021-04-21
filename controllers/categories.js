const categoriesRouter = require('express').Router()
const credentialsExtractor = require('../midelwares/credentialsExtractor')
const path = require('path')

// Models
const Category = require('../models/Category')
const Service = require('../models/Service')

// Obtener todas las categorias
categoriesRouter.get('/', async (request, response, next) => {
  const categories = await Category.find({}).populate({ path: 'serviceId', select: 'name' })
  response.json(categories)
})

// Crear una categoria
categoriesRouter.post('/', credentialsExtractor, async (request, response, next) => {
  const { name, serviceId } = request.body
  const { userId } = request

  let sampleFile
  let uploadPath
  try {
    if (Object.keys(request.files).length > 0) {
      sampleFile = request.files.icon
      uploadPath = path.join('public', 'uploads', userId, 'categories-icons', sampleFile.name)
      await sampleFile.mv(uploadPath)
    }
  } catch (error) {
    console.log(error)
    return response.status(500).send(error)
  }
  const newCategory = new Category({
    name,
    serviceId,
    icon: uploadPath
  })
  try {
    const categorySaved = await newCategory.save()
    await Service.findByIdAndUpdate(serviceId, {
      $addToSet: {
        categories: categorySaved._id
      }
    }, { new: true })
    response.json(categorySaved)
  } catch (error) {
    next(error)
  }
})

module.exports = categoriesRouter
