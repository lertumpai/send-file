const express = require('express')
const bodyParser = require('body-parser')

const port = 3000
const app = express()

// import libs
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/files')
const conn = mongoose.connection
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
Grid.mongo = mongoose.mongo
const gfs = Grid(conn.db)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Allows cross-origin domains to access this API
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin' , 'http://localhost:4200')
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    res.append('Access-Control-Allow-Credentials', true)
    next()
})

// add routes
app.use('/upload', upload)

app.get('/', (req, res) => {
    res.send('Hello World')
})

// upload file
// Setting up the storage element
const storage = GridFsStorage({
    gfs : gfs,

    filename: (req, file, cb) => {
        const date = Date.now()
        // The way you want to store your file in database
        cb(null, file.fieldname + '-' + date + '.') 
    },
    
    // Additional Meta-data that you want to store
    metadata: function(req, file, cb) {
        cb(null, { originalname: file.originalname })
    },
    root: 'ctFiles' // Root collection name
})

// Multer configuration for single file uploads
const upload = multer({
    storage: storage
}).single('file')

// Route for file upload
app.post('/upload', (req, res) => {
    console.log(req.file)
    // upload(req,res, (err) => {
    //     if(err){
    //          res.json({error_code:1,err_desc:err})
    //          return
    //     }
    //     res.json({error_code:0, error_desc: null, file_uploaded: true})
    // })
})

app.listen(port, () => console.log(`Start Server -> localhost:${port}`))