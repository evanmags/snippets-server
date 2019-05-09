const express = require('express')
const app = express()

require('dotenv').config()

app.get('/graphQL/:body', (req, res) => {
  process.stdout.write(req.params.body)
  res.send(JSON.stringify({
    data: {
      message: 'You have hit the graphQL end point. There is no data here.',
      request: req.params
    }
  }))
})

app.listen(process.env.PORT, () => {
  process.stdout.write(`serving port ${process.env.PORT} for snippets`)
})
