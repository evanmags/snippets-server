const User = require('../mongodb/User')
const Snippet = require('../mongodb/Snippet')

const resolvers = {
  Mutation: {
    // User mutations
    createUser: (root, { username, hash }) => {
      console.log(username)
      return new User({
        username,
        hash
      }).save()
    },
    deleteUser: (root, { id }) => {
      return { message: 'delete user route' }
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
      return { message: 'delete snippet route' }
    }
  },
  Query: {
    // user queries
    getUser: (root, { username }) => {
      return { message: 'get user route' }
    },
    isUser: (root, { username }) => {
      return { username }
    },
    authenticateUser: (root, { username, hash }) => {
      // const crypto = require('crypto')

      return { id: `${hash}`, username: `${username}` }
    },
    // snippet queries
    getSnippet: (root, { id }) => {
      return { message: 'get snippet route' }
    },
    listSnippets: (root, { id }) => {
      return { message: 'list snippets route' }
    }
  }
}

module.exports = resolvers
