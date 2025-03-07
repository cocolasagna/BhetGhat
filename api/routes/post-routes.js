const express = require('express')
const bodyParser = require('body-parser')
const Postrouter = express.Router()
const controls = require('../controllers/post-controller')
const auth = require('../controllers/auth')


Postrouter.post('/', controls.create_post)
Postrouter.put('/:id', controls.update_post)
Postrouter.delete('/:id', auth ,controls.delete_post)
Postrouter.put('/:id/like', controls.like_post)
Postrouter.get('/:id', controls.one_post)
Postrouter.get('/timeline/:userId', controls.all_post)
Postrouter.post('/addcomment', controls.comment)
Postrouter.get('/getcomment/:postId', controls.get_comment)
Postrouter.post('/addbookmark',auth, controls.bookmark)
Postrouter.get('/bookmark/:userId' , controls.bookmarkposts)

module.exports = Postrouter;