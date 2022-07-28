var express = require('express');
var router = express.Router();

const user = require('../controllers/user')

const board = require('../controllers/board')
const output = require('../controllers/output')
/* GET users listing. */


router.get('/',user)

//board 
router.get('/board/:id',board.config)
router.post('/board/:id/output',output.create)
router.patch('/output/:id/:state',output.update)
router.delete('/output/:id',output.deleteOutput)

//creating board
router.get('/createBoard',(req,res)=>{
  res.status(200).render('createBoard',{user});
})

// delete board
router.delete('/deleteBoard/:id',board.deleteBoard)

router.post('/createBoard',board.create)
module.exports = router;
