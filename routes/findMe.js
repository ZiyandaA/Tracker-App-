var express = require('express');
var router = express.Router();
var authRequire = require('../middlewares/authRequire');

router.get('/', authRequire, (req, res, next) => {
    
    res.send(req.session.user);

})

module.exports = router;