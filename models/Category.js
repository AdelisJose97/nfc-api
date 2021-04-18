const { Schema, model } = require('mongoose')
const timestamp = require('mongoose-timestamp')

const CategorytSchema = new Schema({
  name: {
    type: String
  },
  icon: String,
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Service'
  },
  dishes: [{
    type: Schema.Types.ObjectId,
    ref: 'Dish'
  }]
})
CategorytSchema.plugin(timestamp)

const Category = model('Categories', CategorytSchema)

module.exports = Category
