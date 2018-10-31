const express = require('express')
const path = require('path')

const app = express()

// Serve the static files from React app.
app.use(express.static(path.resolve(__dirname, '../dist')))

// Handle any requests to serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
