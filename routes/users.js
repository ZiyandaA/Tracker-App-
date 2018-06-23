var express = require('express');
var router = express.Router();
var User = require('../models/user');
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(process.env);
  models.User.find()
    .exec()
    .then(data => {
      res.send(data)
    })
  
});

router.delete('/', (req, res, next) => {
  models.User.remove()
    .exec()
    .then(data => {
      console.log(data);
      res.send(data);
    })
})

router.post('/', (req, res, next) => {
  // console.log(req.body, 'this is body')console.log(req.body, 'this is body')
  User.create({
    username: req.body.username,
    password: req.body.password
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.send({err: err});
  })
})

module.exports = router;
