const Chat = require('../model/chat');
const path = require('path')
const User = require('../model/register');

const createChat = async(req, res)=> {
    const newChat = new Chat({
        members : [req.body.senderId , req.body.receiverId]

    }); 
    try {
         
    const result = await newChat.save();
    res.status(200).json(result);

    }catch(err){
        res.status(500).json(err)
    }
};

const userChats = async(req, res)=> {
    try{
        const userchat = await Chat.find({
            members: {$in: [req.params.userId]}
        })
        res.status(200).json(userchat)
    }
    catch(err){
        res.status(500).json(err); 
    }
}

const findChat = async(req, res)=> {
    try {
        const usechat = await Chat.findOne({
            members : {$all: [req.params.firstId ,req.params.secondId]}})
            res.status(200).json(usechat)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports ={createChat, userChats, findChat };