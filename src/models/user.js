const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    street: String,
    city: String,
    state: String,
    creation_date: Date,
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject.password
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('User', userSchema)
