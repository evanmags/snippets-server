const resolvers = {
  Mutation: {
    // User mutations
    createUser: (root, { username, hash }) => {
      return { message: 'create user route' }
    },
    deleteUser: (root, { id }) => {
      return { message: 'delete user route' }
    },

    // snippet mutations
    createSnippet: (root, { username, hash }) => {
      return { message: 'create snippet route' }
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
