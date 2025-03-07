const  Message = require('../model/message');

const  addMessage= async(req, res)=> {
    const {chatId, senderId, content}= req.body
        const msg  = new Message({
            chatId,
            senderId,
            content
    }); 
    try {
         
    const result = await msg.save();
    console.log('result', result.content)
    res.json(result);

    }catch(err){
        res.status(500).json(err);
    }
}

const getMessage = async(req,res)=> {
    const{chatId} = req.params;

    try{
        const result = await Message.find({chatId});
    res.status(200).json(result);
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports ={addMessage,getMessage};