const uniqueValidator = require('mongoose-unique-validator')

const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
})

userSchema.set('toJson', {
  transform: (document, returnedObjet) => {
    returnedObjet.id = returnedObjet._id
    delete returnedObjet._id
    delete returnedObjet.__v
    delete returnedObjet.passwordHash
  }
})
userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)
module.exports = User
