const express = require('express')
const app = express()

require('dotenv').config()

const cors = require('cors')
app.use(cors())

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

const mongoose = require('mongoose')
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => console.log('\nconnected to database'))
  .catch(console.log)

const { importSchema } = require('graphql-import')
const { makeExecutableSchema } = require('graphql-tools')
const schema = makeExecutableSchema({
  typeDefs: importSchema('./schema/User.graphql'),
  resolvers: require('./schema/root.js')
})

const expressGraphQL = require('express-graphql')
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

app.listen(process.env.PORT, () => {
  process.stdout.write(`serving port ${process.env.PORT} for snippets`)
})
