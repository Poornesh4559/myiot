var express = require('express');
var router = express.Router();


const User = require('../models/User');
const Board = require('../models/Board');
const Output = require('../models/Output');

const verify = async (req,res)=>{
    let key = req.params.key;
    let user = await User.findOne({where:{apiKey:key}})
    if(user){
        let board = await Board.findOne({where:{id:req.params.boardId,userID:user.id}});
        if(board){
            let outputs = await Output.findAll({where:{boardID:board.id}})
            res.status(200).json({outputs:outputs})
        }else{
            res.status(404).json({error:'Board not found'})
        }
}else{
    res.status(404).json({error:'User not found'})
}
}

router.get('/:key/:boardId',verify)

module.exports = router;

