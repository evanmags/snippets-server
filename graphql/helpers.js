const User = require('../mongodb/User')
// const Snippet = require('../mongodb/Snippet')

function authenticate (username, hash) {
  return User.findOne({ username }, (err, user) => {
    if (err) return process.stdout.write(err)
    return user.hash === hash ? user : null
  })
}

module.exports = {
  authenticate
}
