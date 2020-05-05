const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('GET route on things.')
})

router.post('/photo', (req, res) => {
    const photo = req.files.photo
    photo.mv(`./${photo.name}`, (err) => {
        if (err) {
            return res.status(500).send(err)
        }
    
        res.send('File uploaded!')
      })
})

module.exports = router