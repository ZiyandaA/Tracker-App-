var express = require('express');
var router = express.Router();
var hashThePassword = require('../utils/passwordHash').cryptoThePassword;
var models = require('../models');
var authValidator = require('../validators/auth');

/* GET home page. */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/signin', (req, res, next) => {
  res.render('signin');
});

router.post('/signup', function(req, res, next) {
  var username = req.body.username;
  var password = hashThePassword(req.body.password);
  authValidator.asAuth(req.body);
  console.log(req.body, 'this is body')

  console.log(username, 'username', password, 'password');
  if (!username || password.length < 5) {
    throw new Error();
  }
  models.User.create({
    username: username,
    password: password,
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.send({err: err});
  })

});

router.post('/signin', (req, res, next) => {
  var username = req.body.username;
  var password = hashThePassword(req.body.password);

  models.User.findOne({'username': username})
    .then(user => {
      if (user && user.password == password) {
        console.log(user, 'authorized user');
        req.session.user = user;
        res.send(user);
      }
      else {
        throw new Error('wrong username or password');
      }
    })
    .catch(err => {
      next(err);
    })
})

router.post('/logout', (req, res, next) => {
  console.log('something');
  if (req.session.user) {
    req.session.destroy(() => {
      res.send({destroyed: true})
    })
  }
  else {
    next();
  }
})

module.exports = router;
