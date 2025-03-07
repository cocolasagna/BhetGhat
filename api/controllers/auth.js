const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const User = require('../model/register')


const auth = async (req,res,next)=>{
        try{

           const token =  req.cookies.jwt

       //    const token = req.header('auth-token')
        
            const verifyUser = jwt.verify(token, process.env.Secret_Key)
            const loggedUser =  await User.findOne({_id:verifyUser._id})
            const loggedInUser = loggedUser.username
            const loggedInid = loggedUser.id
            req.loggedInUser = loggedInUser
            req.loggedInid = loggedInid
    
                next()
           
        }catch(err){
            res.status(401).send(err)
        }

}

/*
const auth = async(req,res,next)=>{
    //get the user from jwt token and add id to req object
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"Authentication not done"})
    }
    
    try {
        const verifyUser = jwt.verify(token, process.env.Secret_Key)
        req.user = verifyUser.user
        next()
    } catch (error) {
        res.status(401).send({error:"Authentication problem"})
    }

}
*/

module.exports = auth; 
