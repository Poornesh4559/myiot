var unirest = require("unirest");
require("dotenv").config();

exports.generateOTP = (otp_length) => {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

exports.fast2sms = async ({ message, contactNumber }, next) => {
  try {
    var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

    req.query({
      "authorization": process.env.FAST2SMS,
      "sender_id": "TXTIND",
      "message": message,
      "route": "v3",
      "numbers": contactNumber
    });

    req.headers({
      "cache-control": "no-cache",
    });
    req.end(function (res) {
      if (res.error){
        console.log(res.error);
      }
      
    
      console.log(res.body);
    });
  } catch (error) {
    console.log(error);
  }
};