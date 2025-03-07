const mongoose = require ('mongoose')


const CommentSchema = new mongoose.Schema({ 

        postId :{
            type:String
        },
        username :{
            type:String
        },
        comment:{
            type:String
        }


})

const Comment= new mongoose.model("Comment", CommentSchema)
module.exports = Comment