var express = require('express');
var router = express.Router();
var signUp = require("../controllers/userSignup")
var signIn = require('../controllers/userSignin')
const session = require("express-session");
var OTPverify = require('../controllers/userOTP')
const User = require("../models/User");
const forgetPass = require('../controllers/createPassword')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { error: '' });
});


router.get('/signup',(req,res) =>{
  res.render('signup',{error:''})
})


router.post('/signup',signUp.signup)

router.post('/otp', OTPverify.verify)
router.get('/signin',async (req,res) =>{
  if(req.session.userID){
    res.redirect('/user')
  }else{
    res.render('signin',{error:"" ,success:""})
  }
  
})
router.post('/signin',signIn)

router.get('/logout', (req,res)=>{
  if(req.session.userID){
    req.session.destroy((err)=>{
      console.log("destroying")
      //req.session.userID = null;
      res.redirect('/')
    })
    
  }else{
    res.redirect('/')
  }
})


router.get('/forgetPassword',(req,res) =>{
  res.render('forgetPass',{error:''})
})



router.post('/forgetPassword',forgetPass.otp);
router.post('/createPassword/:phone',forgetPass.create);

module.exports = router;
