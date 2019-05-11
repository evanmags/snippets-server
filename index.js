const express = require('express')
const app = express()

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

require('dotenv').config()

const crypto = require('crypto')

// connect to database

app.get('/graphql', (req, res) => {
  // parse query
  const hash = crypto.createHash(process.env.SALT)
  const query = JSON.parse(req.query.query)
  hash.update(query.password, 'utf8')
  query.password = hash.digest('hex')
  // query database
  // structure response

  // send response
  res.send({
    data: {
      message: 'You have hit the graphQL "get" end point. There is no data here.',
      request: query
    }
  })
})

app.post('/graphql', (req, res) => {
  // parse query
  const hash = crypto.createHash(process.env.SALT)
  const query = req.body
  hash.update(query.password, 'utf8')
  query.password = hash.digest('hex')
  // query database
  // structure response

  // send response
  res.send({
    data: {
      message: 'You have hit the graphQL "post" end point. There is no data here.',
      request: query
    }
  })
})

app.listen(process.env.PORT, () => {
  process.stdout.write(`serving port ${process.env.PORT} for snippets`)
})
