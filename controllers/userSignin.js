const bcrypt = require("bcrypt");
const express = require("express");
const session = require("express-session");
const User = require("../models/user");
// signup route
// const signup= async (req, res) => {
//   const body = req.body;

//   if (!(body.password && body.conPassword)) {
//     return res.status(400).send({ error: " Password missmatching" });
//   }

//   // generate salt to hash password
//   const salt = await bcrypt.genSalt(10);
//   // now we set user password to hashed password
//   let password = await bcrypt.hash(body.password, salt);
//   const user = await User.findByIdAndUpdate(session.Cookie.userID,{password:password}).exec((err,user)=>{
//     if (err){
//       console.log(err)
//     }else{
//       console.log(user)
//     }
//   })
//   res.redirect('/profile')
//   console.log('password updated successfully')
  


// }


const signin = async (req, res) => {
    const body = req.body;
    const user = await User.findOne({where:{ phone: body.phone }});
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        req.session.userID = user.id
        console.log("assigning here")
        res.status(200).redirect('/profile');
      } else {
        res.status(400).render('signin',{ error: "Invalid Password" });
      }
    } else {
      res.status(401).render('signin',{ error: "User not found" });
    }
  }
  
  module.exports =signin;