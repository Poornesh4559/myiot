const User = require("../models/User");
const Board = require("../models/Board");
const Output = require("../models/Output");


const create = async (req, res) => {
  if (!req.session.userID) {
    return res.redirect("/signin");
  } else {
    const board = await Board.findByPk(req.params.id);
    if(board){
        const output = await Output.create({
            name: req.body.name,
            boardId: board.id,
            gpio: req.body.gpio,
            state: req.body.state
        });
        res.redirect("/user/board/"+board.id);
    }
    else{
        res.json({error:"Board not found"});
    }
    
    
  }
}


const update = async (req, res) => {
  if (!req.session.userID) {
    return res.redirect("/signin");
  } else {
    const output = await Output.update({state: req.params.state}, {where: {id: req.params.id}});
    console.log('output updated');
  }
}


const deleteOutput = async (req, res) => {
  if (!req.session.userID) {
    return res.redirect("/signin");
  } else {
    const output = await Output.destroy({where: {id: req.params.id}});
    console.log('output deleted');
  }
}


module.exports = { create, update, deleteOutput };