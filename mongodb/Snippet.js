const mongoose = require('mongoose')

const Schema = mongoose.Schema

const snippetSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})

const Snippet = mongoose.model('Snippet', snippetSchema)

module.exports = Snippet
