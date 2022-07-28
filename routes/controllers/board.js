const express = require("express");
const session = require("express-session");
const User = require("../../models/User");
const Board = require("../../models/Board");
const Output = require("../../models/Output");



const create = async (req, res) => {
  if (!req.session.userID) {
    return res.redirect("/signin");
  } else {
    const user = await User.findByPk(req.session.userID);
    const board = await Board.create({
      name: req.body.name,
      userID: user.id,
      description: req.body.description
    });
    res.redirect("/user");
  }
}

const config = async (req, res) => {
  if(!req.session.userID){
    return res.redirect("/signin");
  }else{
      const board = await Board.findByPk(req.params.id);
      const outputs = await Output.findAll({where:{boardId:board.id}});
      // console.log(board)
      // console.log(typeof req.session.userID,typeof board.userID)
      if( req.session.userID == board.userID){
        res.render("board", {board: board,outputs:outputs});
      }
      else{
        res.send("You are not authorized to view this board");
      }
  }
}

const deleteBoard = async (req, res) => {
  if (!req.session.userID) {
    return res.redirect("/signin");
  } else {
     await Board.destroy({where: {id: req.params.id}});
     await Output.destroy({where: {boardId: req.params.id}});
     console.log("Board deleted");
    //res.redirect("/user");
  }
}

module.exports = {create, config, deleteBoard};