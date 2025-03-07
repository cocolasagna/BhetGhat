const express = require('express')
const bcrypt  = require('bcrypt')
const bodyParser = require('body-parser')
const User = require ("../model/register")
const router = express.Router()
const app = express()
const controls = require('../controllers/auth-controller')
const auth = require('../controllers/auth')


//router.get('/', controls.homepage);
//router.get('/signup', controls.signup)
//router.get('/login', controls.login)
router.post('/signup', controls.signup_auth)
router.post('/login',controls.login_auth)
router.get('/logout',controls.logout )

module.exports =  router;