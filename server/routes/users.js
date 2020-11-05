let express = require('express');
let router = express.Router();
let users = require("../dao/users")

/* GET users listing. */
router.get('/:userName', function(req, res, next) {
  users.findUserByName({userName: req.params.userName})
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  console.log("richtiger endpoint")
  console.log(req.body)
  users.insertUser(req.body)
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {


})

module.exports = router;
