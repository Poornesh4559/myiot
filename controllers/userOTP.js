const session = require("express-session");
const User = require("../models/User");

exports.verify = async (req,res)=>{
    if (!req.session.userID){
        return res.redirect('/signup')
    }else{
    const id  = req.session.userID
    const user = await User.findByPk(id).then((user)=>{
        console.log(user.otp)
        console.log(req.body.otp)
        
       if (user.otp == req.body.otp){
           res.render('profile',{user:user})
       }else{
           res.render('OTPverify', {phone:user.phone, error:'* in correct OTP'})
       }
    })
    }
}