var express = require('express');
var router = express.Router();
var models = require('../models');


router.get('/', async function(req, res, next) {
    try {
        console.log(req.query, 'this is params')
        var ObjectId = require('mongoose').Types.ObjectId;
        let user = await models.User.findById(req.query.user_id).lean().exec();
        let userTrackers = await models.Tracker.find({userID: user._id}).lean().exec();
        for (let i=0; i < userTrackers.length; i++) {
        let trackerTargets = await models.TrackerTarget.find({trackerID: userTrackers[i]._id});
        userTrackers[i] = Object.assign({}, userTrackers[i], {trackerTargets: trackerTargets})
        }
        // console.log(userTrackers, 'this is userTrackers')
        user.trackers = userTrackers;
        

        res.send(user)
    }
    catch (err) {
        next(err);
    }
    
    
});

router.get('/:id', (req, res, next) => {
    models.Tracker.find({_id: req.params.id})
        .exec()
        .then(tracker => {
            res.send(tracker);
        })
        .catch(err => {
            next(err);
        })
})

router.post('/', (req, res, next) => {
    var userID = req.body.userID;
    var name = req.body.name;
    // if( !userID ) {
    //     throw new Error();
    
    
    models.Tracker.create({
        userID: userID,
        name: name
    })
    .then(tracker => {
        res.send(tracker);
    })
    .catch(err => {
        next(err);
    })
})

router.delete("/:id", (req, res, next) => {

// console.log("DELETE TRACKER");

    models.TrackerTarget.find({trackerID: req.params.id })
    .remove()
    .exec()
    .then(data => {

        // delete the tracker
        models.Tracker.findById(req.params.id)
        .remove()
        .exec()
        .then(data => {
            res.send(data);
        })

    })
    .catch(err => {
        //next(err);
        console.log("ERROR DELETE");
    })
})

router.patch("/:id", (req, res, next) => {
    var trackerName = req.body.name;
    models.Tracker.findById(req.params.id)
        .exec()
        .then(tracker => {
            tracker.name = trackerName;
            tracker.save((err, tracker) => {
                if (err) throw new Error("some error");
                res.send(tracker);
            })
        })
})



module.exports = router;
