var express = require('express');
var router = express.Router();
var signUp = require('../controllers/userSignUp')
var signIn = require('../controllers/userSignin')
const session = require("express-session");
var OTPverify = require('../controllers/userOTP')

const User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { error: '' });
});


router.get('/signup',(req,res) =>{
  res.render('signup',{error:''})
})

router.get('/profile',async (req,res) =>{
  console.log('loging cookie for profile::::')
  console.log(req.session.cookie);
  console.log(req.session.id);
  if(req.session.userID){
    let user = await User.findByPk(req.session.userID)
    res.render('profile',{user:user})
  }else{
    console.log('redirecting here')
    res.redirect('/signin')
  }
 
})

router.post('/signup',signUp.signup)

router.post('/otp', OTPverify.verify)
router.get('/signin',async (req,res) =>{
  if(req.session.userID){
    res.redirect('/profile')
  }else{
    res.render('signin',{error:""})
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

module.exports = router;
