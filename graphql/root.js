const mongoose = require('mongoose')
const User = require('../mongodb/User')
const Snippet = require('../mongodb/Snippet')

const resolvers = {
  hello: () => { return 'hello world' },
  // User mutations
  createUser: ({ username, hash }) => {
    // if (User.find({ username })) return null
    return new User({
      username,
      hash
    }).save()
  },
  deleteUser: ({ id }) => {
    return mongoose.findOneAndDelete({ _id: id })
  },

  // snippet mutations
  createSnippet: (data) => {
    const snippet = new Snippet({
      user: data.user_id,
      tags: data.tags,
      languages: data.languages,
      content: data.content
    }).save()
    return snippet
  },
  updateSnippet: ({ username, hash }) => {
    return { message: 'update snippet route' }
  },
  deleteSnippet: ({ id }) => {
    return mongoose.findOneAndDelete({ _id: id })
  },
  // user queries
  getUser: ({ username }) => {
    return User.findOne({ username })
  },
  authenticateUser: ({ username, hash }) => {
    const user = User.findOne({ username })
    return user.hash === hash ? user : null
  },
  // snippet queries
  getSnippet: ({ title }) => {
    return Snippet.find({ title })
  }
}

module.exports = resolvers
