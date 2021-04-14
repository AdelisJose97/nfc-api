const { Schema, model } = require('mongoose')
const timestamp = require('mongoose-timestamp')

const dishSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  categoryIcon: String,
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Categories'
  }
})

dishSchema.plugin(timestamp)
const Dish = model('Dish', dishSchema)

module.exports = Dish
