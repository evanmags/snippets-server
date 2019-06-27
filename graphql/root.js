const User = require('../mongodb/User')
const Snippet = require('../mongodb/Snippet')
const { authenticate } = require('./helpers')

const resolvers = {
  // this is tthe test request resolver
  hello: () => {
    return 'Hello World!'
  },

  // User mutations
  createUser: ({ username, hash }) => {
    const user = new User({
      username,
      hash
    }).save()

    return user
  },
  deleteUser: ({ id }) => {
    return User.findOneAndDelete({ _id: id })
  },

  // snippet mutations
  createSnippet: async ({ userID, snippetInfo }) => {
    const snippet = await new Snippet({
      user: userID,
      ...snippetInfo
    }).save()

    User.findByIdAndUpdate(userID, { $push: { snippets: snippet } })

    return snippet
  },
  updateSnippet: ({ snippetID, snippetData }) => {
    return Snippet.findByIdAndUpdate(snippetID, snippetData)
  },
  deleteSnippet: ({ userID, snippetID }) => {
    User.findByIdAndUpdate(userID, { $pull: { snippets: snippetID } }, (err) => {
      if (err) throw new Error('User could not be found')
    })

    return Snippet.findByIdAndDelete(snippetID)
  },

  // user queries
  getUser: ({ username, hash }) => {
    return authenticate(username, hash)
      .populate({ path: 'snippets', model: 'Snippet' })
      .exec()
  },

  // snippet queries
  getSnippet: ({ snippetID }) => {
    return Snippet.findById(snippetID)
  }
}

module.exports = resolvers
