const mongoose = require ('mongoose')


const BookmarkSchema = new mongoose.Schema({ 

        postId :{
            type:String
        },
        userId:{
            type:String
        }

})

const Bookmark= new mongoose.model("Bookmark", BookmarkSchema)
module.exports = Bookmark