const mongoose = require('mongoose')


const ChatSchema = mongoose.Schema({
    members:{
        type: Array,
    },
    
    },
    {
        timestamps:true,
    },
    
);

const Chat= new mongoose.model("Chat", ChatSchema)
module.exports = Chat