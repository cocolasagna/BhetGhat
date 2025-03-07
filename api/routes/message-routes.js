const express = require('express')
const controls = require('../controllers/message-controller')
const Messagerouter = express.Router()

Messagerouter.post("/", controls.addMessage)
Messagerouter.get("/:chatId", controls.getMessage)

module.exports =  Messagerouter;