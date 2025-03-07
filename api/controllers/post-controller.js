const Post = require('../model/post');
const path = require('path')
const auth = require('./auth');
const User = require('../model/register');
const Comment = require('../model/comment')
const Bookmark = require('../model/bookmark');
const { post } = require('../routes/post-routes');

const create_post =  async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
};

const update_post = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({$set:req.body});
            res.status(200).json("the post has been updated");
        } else {
            res.status(403).json("you can update only your psot");
        }
    } catch (err) {
        res.status(500).json(err);

    }
}

const delete_post = async (req, res) => {
   const UserId = req.loggedInid

    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === UserId) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
            console.log('deleted post')
        } else {
            res.status(403).json("you can delete only your post");
        }
    } catch (err) {
        res.status(500).json(err);

    }
};

const like_post = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes:req.body.userId } });
            res.status(200).json("The post has been liked")
        } else {
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("The post has been disliked"); 
        }
    } catch (err) {
        res.status(500).json(err);
        
    }
}

const one_post = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);   
    }
};




const all_post = async(req,res)=>{
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId)=>{
                return Post.find({ userId: friendId});
            })
        );
        res.json(userPosts.concat(...friendPosts))
       
    } catch (err) {
        res.status(500).json(err);
    }
}



const comment =  async (req, res) => {
    const newComment  = new Comment(req.body)
    try {
        const savedComment = await newComment.save();
    } catch (err) {
        res.status(500).json(err);
    }
};


const get_comment = async(req,res)=>{
    const postId = req.params.postId
    const userComment = await Comment.find({postId : postId})
    res.json(userComment)
}



   

const bookmarkposts = async(req,res)=>{
    const userId = req.params.userId
    const userBookmark = await Bookmark.find({userId : userId})

    let friendList =[]
    userBookmark.map((friend)=>{
        const {postId} = friend
        friendList.push({postId})
       

    })
    let bookmarkpost = []
    for(i=0; i < friendList.length ; i++){
        let postId = friendList[i].postId
       
        let bookmark = await Post.findById(postId)
         bookmarkpost.push(bookmark)
        
       
    }
    res.json(bookmarkpost)
    
   
}

const bookmark = async(req,res)=>{
    const postId = req.body.postId
    const userId = req.loggedInid
   const userbookmark = await Bookmark.findOne({postId:postId , userId:userId}) 

if(userbookmark){
    console.log('Already Bookmarked')
}else{
   
    const newBookmark = new Bookmark (req.body)
    try{
        const savedBookmark = await newBookmark.save()
        console.log('bookmark saved')
    }catch(err){
        res.status(500).json(err)
    }
}
}




module.exports ={ create_post , update_post , delete_post, one_post, all_post, like_post, comment , get_comment , bookmark, bookmarkposts};