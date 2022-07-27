var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const user = {
  boards:{
    name:'hey'
  }
}
router.get('/board',(req,res)=>{
  res.status(200).render('board',{user});
})

module.exports = router;
