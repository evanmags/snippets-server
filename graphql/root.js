const mongoose = require('mongoose')
const User = require('../mongodb/User')
const Snippet = require('../mongodb/Snippet')

const resolvers = {
  Mutation: {
    // User mutations
    createUser: (root, { username, hash }) => {
      return new User({
        username,
        hash
      }).save()
    },
    deleteUser: (root, { id }) => {
      return mongoose.findOneAndDelete({ _id: id })
    },

    // snippet mutations
    createSnippet: (root, data) => {
      const snippet = new Snippet({
        user: data.user_id,
        tags: data.tags,
        languages: data.languages,
        content: data.content
      }).save()
      return snippet
    },
    updateSnippet: (root, { username, hash }) => {
      return { message: 'update snippet route' }
    },
    deleteSnippet: (root, { id }) => {
      return mongoose.findOneAndDelete({ _id: id })
    }
  },
  Query: {
    // user queries
    getUser: (root, { username }) => {
      return User.findOne({ username })
    },
    isUser: (root, { username }) => {
      return User.find({ username })
    },
    authenticateUser: (root, { username, hash }) => {
      const user = User.findOne({ username })
      return user.hash === hash ? user : null
    },
    // snippet queries
    getSnippet: (root, { title }) => {
      return Snippet.find({ title })
    },
    listSnippets: (root, { username }) => {
      return User.findOne({ username })
    }
  }
}

module.exports = resolvers
