const express = require('express')
const bodyParser = require('body-parser')

const port = 3000
const app = express()

// import routes
const upload = require('./router/upload/upload')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// add routes
app.use('/upload', upload)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => console.log(`Start Server -> localhost:${port}`))