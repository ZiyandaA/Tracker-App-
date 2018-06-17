var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
    models.TrackerTarget.find()
        .exec()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
  
});

router.post('/', (req, res, next) => {
    var trackerID= req.body.trackerID;
    var name = req.body.name;
    var target = req.body.target;
    var value = req.body.value;

    
    models.TrackerTarget.create({
        trackerID: trackerID,
        name: name,
        target: target,
        value: value,
        date: Date.now(),
    })
    .then(tracktarget => {
        res.send(tracktarget);
    })
    .catch(err => {
        next(err);
    })
})

module.exports = router;
