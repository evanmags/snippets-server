const mongoose = require('mongoose')

const Schema = mongoose.Schema

const snippetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: false
  },
  languages: {
    type: [String],
    required: false
  }
})

const Snippet = mongoose.model('Snippet', snippetSchema)

module.exports = Snippet
