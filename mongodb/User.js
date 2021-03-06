const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  snippets: {
    type: [Schema.Types.ObjectId],
    required: false
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
