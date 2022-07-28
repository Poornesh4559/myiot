const { fast2sms } = require("./otputil");

const test = async () => {
    await fast2sms({
        message: "your otp is 123456",
        contactNumber: "9566788835"
      });
}
test();

