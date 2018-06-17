var express = require('express');
var router = express.Router();
var authRequire = require('../middlewares/authRequire');

/* GET home page. */
router.get('/', authRequire, function(req, res, next) {
  let puppyName = "minky";
  let age = 2;
  console.log(req.session);
  res.send({age: age, name: puppyName});
});


router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    //www.asdfasd.com/api/puppy/1
})


module.exports = router;

