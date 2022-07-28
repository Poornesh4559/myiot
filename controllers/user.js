const bcrypt = require("bcrypt");
const express = require("express");
const session = require("express-session");
const User = require("../models/User");
const Board = require("../models/Board");


module.exports = async (req,res) =>{

    if(req.session.userID){
      var user = await User.findByPk(req.session.userID)
      var boards = await Board.findAll({where:{userID : user.id}})
      res.render('profile',{user:user ,boards:boards})
    }else{
      console.log('redirecting here')
      res.redirect('/signin')
    }
   
  }