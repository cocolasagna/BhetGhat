const express = require('express')
const bodyParser = require('body-parser')
const controls = require('../controllers/chat-controller')
const Chatrouter = express.Router()

Chatrouter.post("/", controls.createChat)
Chatrouter.get("/:userId", controls.userChats)
Chatrouter.get("/find/:firstId/:secondId", controls.findChat)

module.exports =  Chatrouter;
