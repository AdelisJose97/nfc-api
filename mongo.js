const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI

// conexion a la mongoose
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.log('error al conectar', err)
  })
