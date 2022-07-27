const session = require("express-session");
//const { where } = require("sequelize");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const { generateOTP, fast2sms } = require("../utils/otputil");

exports.signup = async (req, res) => {
  var body = req.body;
  if (!(body.phone && body.name)) {
    return res.status(400).render("signup", { error: "invalid phone or name" });
  }
  if ((body.password != body.conPassword)) {
    return res
      .status(400)
      .render("signup", { error: " Password missmatching" });
  } else {
    const user = await User.findOne({ where: { phone: body.phone } });
    if (user) {
      return res.status(400).render("signup", { error: "* user exsists" });
    } else {
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      let password = await bcrypt.hash(body.password, salt);
      //generate otp
      const otp = generateOTP(6);
      const person = await User.create({
        phone: body.phone,
        name: body.name,
        otp: otp,
        password:password
      });
      //send otp to phone number
      await fast2sms({
        message: `It's form MyIot ,Your OTP is ${otp}`,
        contactNumber: body.phone,
      });
      req.session.userID = person.id;
      console.log(person);
      console.log(`the userID: ${req.session.userID}`);
      //  User.findOne({ phone: body.phone }).exec((err, result) => {
      //   if (err) {
      //     console.log(err);
      //     session.Cookie.userID = result._id;
      //     console.log(result);
      //     console.log(`the userID: ${session.Cookie.userID}`)
      //   }
      // });
      // console.log(user)

      console.log(req.session.userID);
      res.render("./OTPverify", { phone: body.phone, error: "" });
    }
  }
};
