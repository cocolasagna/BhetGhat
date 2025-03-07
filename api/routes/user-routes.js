const express = require('express')
const bodyParser = require('body-parser')
const userRouter = express.Router()
const controls = require('../controllers/user-controller')
const auth = require('../controllers/auth')



//update User
userRouter.put("/:id",auth, controls.updateUser)
//delete User
userRouter.delete("/:id", controls.deleteUser)
//follow User
userRouter.put("/:id/follow", controls.followUser)
//Unfollow User
userRouter.put("/:id/unfollow",controls.unfollowUser)

//getUser
userRouter.get("/" , controls.get_user)

//get all followingList
userRouter.get('/friend',auth, controls.following_user)

//FOllwer list
userRouter.get('/follower', auth , controls.follower_user)

userRouter.get('/suggested' ,controls.suggested )

module.exports = userRouter