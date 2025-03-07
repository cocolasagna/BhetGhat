const express = require('express')
const bodyParser = require('body-parser')
const Profilerouter = express.Router()
const controls = require('../controllers/profile-controller')
const auth = require('../controllers/auth')


Profilerouter.get('/:username',auth,controls.Profile)
Profilerouter.get('/search/:username' , controls.searchProfile)


module.exports = Profilerouter;