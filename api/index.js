require('dotenv').config()
var express = require("express");
const mongoose = require ('mongoose');
const app = express();
const port = 5000;
const router = require('./routes/auth-routes');
const bodyParser = require('body-parser')
const Postrouter = require('./routes/post-routes')
const Profilerouter = require('./routes/profile-routes')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user-routes')
const Chatrouter = require('./routes/chat-routes')
const Messagerouter = require('./routes/message-routes')
const multer = require("multer")
const path = require("path")
const cors = require('cors')


app.use(cookieParser())
app.use(express.static('public'));
app.use (bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json())
app.use(router)
app.use(cors({
    origin:"http://localhost:5000",
    withCredentials:true
}
))


const storage = multer.diskStorage({
    destination:(req,file,cb)=> {
        cb(null,"public/images");
    },
    filename: (req,file,cb) => {
        cb(null,req.body.name)
    }

});

const upload = multer({storage});
app.post("/upload", upload.single("file") , (req,res) =>{
    try{
       return res.status(200).json("File uploaded successfully")
    }catch(err){
        console.log(err)
    }
})

app.use("/post",Postrouter)
app.use('/profile',Profilerouter)
app.use('/user',userRouter)
app.use("/chat",Chatrouter)
app.use('/message',Messagerouter)


//connecting to the database
mongoose.connect(
    process.env.conn_str,
    { 
  
    useNewUrlParser: true, 
    useUnifiedTopology: true ,

    },(err) => {
    if (err) {
    console.log(err);
    } else {
    console.log("mongodb is connected");
}});

app.use("/images",express.static(path.join(__dirname,"public/images")));



mongoose.connection.once('open',() => { 
    app.emit('ready'); 
});

app.on('ready', function() { 
    app.listen(port, () => {
    console.log('Server started'); 
  });
});


//listening to the port
/*app.listen(port,()=>{
    console.log("Server started")
})
*/
//Routes
