const User = require('../model/register')
const bcrypt = require('bcrypt')
const path = require('path')

//UpdateUser
const updateUser = async(req,res,next)=>{

    
    if(req.body.currentPassword){
        try{
      
        const userId = req.loggedInid
        const user = await User.findById(userId)
       const currentPassword = req.body.currentPassword
      const newpassword =  req.body.newpassword 
           const hash =  bcrypt.hashSync(newpassword, 12)
        let compare = await bcrypt.compareSync(currentPassword,user.password)

        if(compare){
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set :{password : hash }
            });
        }else{
            console.log("password doesnot match")
        }
        console.log("password successfully updated")
    
      }
catch(err){
        console.log(err)

      }
      }
      
     else{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set : req.body,
        });
        console.log("Updated successfully")
        
    }
    
        catch(err){console.log(err)}
}
        
}

//}
/*else {
    res.status(403).json("cannot update others account")
}*/


//DeleteUser
const deleteUser = async(req,res,next)=>{
    // const user = req.user
    // const username =req.params.username
     
 //if(username == user)  {
     
  
     try{
         await User.findByIdAndDelete(req.params.id)
         console.log("user has been Deleted successfully")
         return res.status(200)
     }
     
         catch(err){console.log(err)}
 }



 //Follow a User
const followUser = async(req,res,next)=>{
    if(req.body.userId !== req.params.id){
                    try{
                           
                           const user = await User.findById(req.params.id)
                           const currentUser = await User.findById(req.body.userId)
                           
                           if(!user.followers.includes(req.body.userId)){
                                await user.updateOne({ $push: { followers: req.body.userId }})
                                await currentUser.updateOne({$push:{ following:req.params.id }})
                                let c = await User.findById(req.body.userId)
                               
                                res.json(c)
                                console.log("Successfully Followed")
                                 
                           }else{
                            console.log("Already followed")
                        
                           }
                    }catch(err){
                        console.log("failure")
                        console.log(err)
                    }
            
}
    else{
            console.log("cannot follow self")
    }
}


//Unfollow User
const unfollowUser = async(req,res,next)=>{
    if(req.body.userId !== req.params.id){
                    try{
                           
                           const user = await User.findById(req.params.id)
                           const currentUser = await User.findById(req.body.userId)
                          
                           
                           if(user.followers.includes(req.body.userId)){
                                await user.updateOne({ $pull: { followers: req.body.userId }})
                                await currentUser.updateOne({$pull:{ following:req.params.id }}  )
                                    console.log('successfully Unfollowed')
                                    let c = await User.findById(req.body.userId) // new data of currentUser
                                  
                                res.json(c)
                            
                               
                                 
                           }else{
                            console.log("You donot follow this user")
                        
                           }
                    }catch(err){
                        console.log("failure")
                        console.log(err)
                    }
            
}
    else{
            console.log("cannot follow self")
    }
}


const get_user = async(req,res,next)=>{
    const userId  = req.query.userId
    const username  = req.query.username
    try{
        const user = userId
         ? await User.findById(userId) 
        : await User.findOne({username:username});
        const {password,tokens, ...other} = user._doc
        res.status(200).json(other)

    }
    catch(err){
        res.status(500).json(err)
    }
}


//Get following list
const following_user = async(req,res,next)=>{
    try{
        const userId = req.loggedInid
        const user = await User.findById(userId)
     
        const friends = await Promise.all(
            user.following.map((friendId)=>{
              return  User.findById(friendId)
            })
        )
        let friendList =[]
        friends.map((friend)=>{
            const {_id, username, profilePicture} = friend
            friendList.push({_id,username, profilePicture})
           
        })
        res.status(200).json(friendList)
    }catch(err){
        res.status(500).json(err)
    }
}



//follwers list

const follower_user = async(req,res,next)=>{
    try{
        const userId = req.loggedInid
        const user = await User.findById(userId)
      
        const friends = await Promise.all(
            user.followers.map((friendId)=>{
              return  User.findById(friendId)
            })
        )
        let friendList =[]
        friends.map((friend)=>{
            const {_id, username, profilePicture} = friend
            friendList.push({_id,username, profilePicture})
           
        })
        
        res.status(200).json(friendList)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}


//Suggestions

const suggested = async(req,res)=>{
           
   
const suggestions =    await User.aggregate([{$sample:{size:6}}])
    let suggestion = []

suggestions.map((s)=>{
    const {username, profilePicture} = s
  suggestion.push({username , profilePicture})
})
    return res.json(suggestion)

}



module.exports = {updateUser, deleteUser,followUser, unfollowUser , get_user,following_user , follower_user , suggested }