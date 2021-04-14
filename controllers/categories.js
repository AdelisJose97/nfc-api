const categoriesRouter = require('express').Router()
const credentialsExtractor = require('../midelwares/credentialsExtractor')
const path = require('path')

// Models
const Category = require('../models/Category')
const Restaurant = require('../models/Restaurant')

categoriesRouter.post('/', credentialsExtractor, async (request, response, next) => {
  const { name } = request.body

  const { userId } = request
  const restaurant = await Restaurant.findById(userId)

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
    icon: uploadPath
  })
  try {
    const categorySaved = await newCategory.save()
    restaurant.categories = restaurant.categories.concat(categorySaved._id)
    await restaurant.save()
    response.json(categorySaved)
  } catch (error) {
    next(error)
  }
})

module.exports = categoriesRouter
