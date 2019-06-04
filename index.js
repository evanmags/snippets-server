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
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('\nconnected to database'))
  .catch(console.log)

const { buildSchema } = require('graphql')
const { importSchema } = require('graphql-import')
const schema = buildSchema(importSchema('./graphql/User.graphql'))
const resolvers = require('./graphql/root.js')

const expressGraphQL = require('express-graphql')
app.use('/graphql', expressGraphQL({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(process.env.PORT, () => {
  process.stdout.write(`serving port ${process.env.PORT} for snippets`)
})
