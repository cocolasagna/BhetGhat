const User = require ("../model/register")
const express = require('express')
const app = express()
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const Post = require('../model/post');
const cookieParser = require('cookie-parser')


//signup authentication
const signup_auth = async(req,res,next)=>{
    try{
        //For Username
        const username = req.body.username;
        const userExist = await User.findOne({username: username});
        if(userExist){
            console.log('username already exists')
          //  return res.status(433).redirect('/signup')
        }
        //For Email
        const email = req.body.email;
        const emailExist = await User.findOne({email})
        if(emailExist){
            console.log('account already exists with this email')
          //  return res.status(433).redirect('/signup')
        }

        //for Password
        const password = req.body.password;
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        if(format.test(password)){
            check = true;
        }
       
        const hash = bcrypt.hashSync(password,12)
        const cpassword = req.body.confirmpassword;
        if(password === cpassword && password.length >8 && check == true ){
            const signupUser = new User({
                //fullname: req.body.fullname,
                username : req.body.username,
                email: req.body.email,
                password: hash,
            })
            const token = await signupUser.generateAuthToken();
          
            await signupUser.save();
         //   res.status(201).redirect('/login');
            console.log('User registerd')
        }else{
           // res.redirect('/signup')
            console.log('User Not registered')
        }

    }catch(err){
        console.log(err)
    }
}



//Login authentication
const login_auth = async (req,res,next)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;

     
      const userExist = await User.findOne({username: username});
      if (userExist){
            let bool = await bcrypt.compareSync(password, userExist.password)

        
        
        if(bool){
        //cookies
         const token = await userExist.AuthToken();
         res.cookie("jwt", token,{
             //expires : new Date(Date.now()+500000),
             httpOnly:true,
             //secure:true
         }) 
        
         
         res.status(200).json(userExist)

        }else{
          //  res.redirect('/login')
            console.log('password is incorrect')
        }
        }else{
          //  res.redirect('/login')
            console.log('Username does not exist')
        }
      
   
   }catch(error){
    res.status(400).send('Invalid')
    console.log(error)
}
}





const logout = async(req,res,next)=>{
    try{
      
        res.clearCookie('jwt')
       // await req.loggedUser.save()
        res.redirect('/login')
    }catch(err){
        console.log(err)
    }
}


module.exports = { signup_auth, login_auth, logout};