const mongoose = require('mongoose')


const MessageSchema = mongoose.Schema({
    chatId:{
        type: String ,
    },
    senderId: {
        type:String,
    },
    content: {
        type:String,
    },
    },
    {
        timestamps:true,
    }
    
);

const Message= new mongoose.model("Message", MessageSchema)
module.exports = Message