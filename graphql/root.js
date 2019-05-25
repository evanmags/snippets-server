const User = require('../mongodb/User')
const Snippet = require('../mongodb/Snippet')
const { authenticate } = require('./helpers')

const resolvers = {
  hello: () => {
    return 'hello world'
  },
  // User mutations
  createUser: ({ username, hash }) => {
    // if (User.find({ username })) return null
    return new User({
      username,
      hash
    }).save()
  },
  deleteUser: ({ id }) => {
    return User.findOneAndDelete({ _id: id })
  },

  // snippet mutations
  createSnippet: async ({
    username,
    hash,
    tags,
    languages,
    content,
    title
  }) => {
    const user = await authenticate(username, hash)
    if (!user) { throw new Error(`No user exists for the specified username: ${username}`) }
    return new Snippet({
      user,
      title,
      tags,
      languages,
      content
    }).save()
  },
  updateSnippet: ({ username, hash }) => {
    return { message: 'update snippet route' }
  },
  deleteSnippet: ({ id }) => {
    return Snippet.findOneAndDelete({ _id: id })
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
