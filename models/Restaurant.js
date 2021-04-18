const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const timestamp = require('mongoose-timestamp')

const restaurantSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  address: String,
  phoneNumber: Number,
  avatar: String,
  cover: String,
  services: [{
    type: Schema.Types.ObjectId,
    ref: 'Service'
  }]
})

restaurantSchema.plugin(uniqueValidator)
restaurantSchema.plugin(timestamp)

const Restaurant = model('Restaurant', restaurantSchema)

module.exports = Restaurant
