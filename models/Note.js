const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJson', {
  transform: (document, returnedObjet) => {
    returnedObjet.id = returnedObjet._id
    delete returnedObjet._id
    delete returnedObjet.__v
  }
})

const Note = model('Note', noteSchema)

module.exports = Note

/* Note.find({}).then(result => {
  console.log(result)
  mongoose.connection.close()
})
  .catch(err => {
    console.log(err)
  }) */

/* const note = new Note({
  content: 'Mongo db es la merma',
  date: new Date(),
  important: true
})

note.save()
  .then(result => {
    console.log(result)
    mongoose.connection.close()
  })
  .catch(err => {
    console.log(err)
  })
 */
