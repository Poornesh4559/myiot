const bcrypt = require("bcrypt");
const express = require("express");
const session = require("express-session");
const User = require("../models/User");



const signin = async (req, res) => {
    const body = req.body;
    const user = await User.findOne({where:{ phone: body.phone }});
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        req.session.userID = user.id
        console.log("assigning here")
        res.status(200).redirect('/user');
      } else {
        res.status(400).render('signin',{ error: "Invalid Password" ,success:""});
      }
    } else {
      res.status(401).render('signin',{ error: "User not found" ,success:""});
    }
  }
  
  module.exports =signin;