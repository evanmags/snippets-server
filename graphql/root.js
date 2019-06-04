const User = require('../mongodb/User')
const Snippet = require('../mongodb/Snippet')
const { authenticate } = require('./helpers')

const resolvers = {
  // this is to test requests actually get through to the server
  hello: () => {
    return 'hello world'
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
  createSnippet: async (data) => {
    const user = await authenticate(data.username, data.hash)
    if (!user) {
      return new Error(
        `No user exists for the specified username: ${data.username}`
      )
    }

    const snippet = await new Snippet({
      user,
      title: data.title,
      tags: data.tags,
      language: data.language,
      content: data.content
    }).save()

    user.snippets.push(snippet)
    await user.save()

    return snippet
  },
  updateSnippet: async data => {
    const user = await authenticate(data.username, data.hash)
    if (!user) {
      throw new Error(
        `No user exists for the specified username: ${data.username}\n`
      )
    }
    const ID = user.snippets.map(snip => {
      return data.original.title === snip.title
    })[0]._id
    Snippet.findByIdAndUpdate(ID, data.updated).save()
  },
  deleteSnippet: async ({ userID, snippetID }) => {
    User.findByIdAndUpdate(userID, { $pull: { snippets: snippetID } }, (err) => {
      if (err) throw new Error('User could not be found')
    })

    return Snippet.findByIdAndDelete(snippetID)
  },

  // user queries
  getUser: async ({ username, hash }) => {
    return authenticate(username, hash)
      .populate({ path: 'snippets', model: 'Snippet' })
      .exec()
  },

  // snippet queries
  getSnippet: async ({ snippetID }) => {
    return Snippet.findById(snippetID)
  }
}

module.exports = resolvers
