const session = require("express-session");
const { body } = require("express-validator");
const User = require("../models/User");
const { generateOTP, fast2sms } = require("../utils/otputil");
const bcrypt = require("bcrypt");


//req.pa

const otp = async (req,res)=>{
    const user = await User.findOne({where:{phone:req.body.phone}})
    if(user){
        const otp = generateOTP(6);
        await user.update({otp:otp},{where:{phone:req.body.phone}});

        await fast2sms({message: `Dear ${user.name} It's from MyIot ,Your OTP is ${otp}`,
        contactNumber: req.body.phone,
        
      });
      res.render(
        "createPass",{error:"",phone:req.body.phone}
    )
    }else{
        res.render('forgetPass',{error:'* User not found'})
    }

}


const create = async (req,res)=>{
    var body= req.body;
    if (body.newPassword != body.conNewPassword) {
        return res
          .status(400)
          .render("createPass", { error: " Password missmatching" ,phone:req.params.phone});
    }
    const user = await User.findOne({where:{phone:req.params.phone}})

    if(user){
        // generate salt to hash password
        if(user.otp != body.otp){
            return res.render("createPass", { error: "* Invalid OTP" ,phone:req.params.phone});
        }
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      let password = await bcrypt.hash(body.newPassword, salt);
        await user.update({password:password},{where:{phone:req.params.phone}});
        res.render('signin',{success:'* Password changed successfully',error:''})
    }
    else{
        res.render('createPass',{error:'something went worng',phone:req.params.phone})
    }
}


module.exports = {otp,create}