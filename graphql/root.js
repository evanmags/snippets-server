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
    console.log(data)
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
      languages: data.languages,
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
  deleteSnippet: async data => {
    const user = await authenticate(data.username, data.hash)
      .populate({ path: 'snippets', model: 'Snippet' })
      .exec()
    if (!user) {
      throw new Error(
        `No user exists for the specified username: ${data.username}`
      )
    }
    const snippetToDelete = user.snippets.map(snippet => {
      return (data.title === snippet.title) && snippet
    })

    user.snippets = user.snippets.map(snippet => {
      return (data.title !== snippet.title) && snippet
    })
    console.log(user)
    user.save()

    console.log(user)

    return Snippet.findOneAndDelete(snippetToDelete)
  },

  // user queries
  getUser: async ({ username, hash }) => {
    return authenticate(username, hash)
      .populate({ path: 'snippets', model: 'Snippet' })
      .exec()
  },

  // snippet queries
  getSnippet: async ({ username, hash, title }) => {
    const user = await authenticate(username, hash)
    if (!user) {
      throw new Error(`No user exists for the specified username: ${username}`)
    }
    const snippet = await Snippet.findOne({
      user,
      title
    })
    return snippet
  }
}

module.exports = resolvers
