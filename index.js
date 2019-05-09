const express = require('express')
const app = express()
const bodyparser = require('body-parser')

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

require('dotenv').config()

app.post('/graphQL', (req, res) => {
  res.send(JSON.stringify({
    data: {
      message: 'You have hit the graphQL end point. There is no data here.',
      request: req.body
    }
  }))
})

app.listen(process.env.PORT, () => {
  process.stdout.write(`serving port ${process.env.PORT} for snippets`)
})
