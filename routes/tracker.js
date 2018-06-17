var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
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
        console.log(userTrackers, 'this is userTrackers')
        user.trackers = userTrackers;
        

        res.send(user)
    }
    catch (err) {
        next(err);
    }
    
    

    
//1. we need to find user
// TimeCreated
//2. if exists, need to find all trackers by userid
//3. if each tracker we need to find all trackertargets by trackerID
//4. get all the data in the single object
/*
{
    user: {
        ...
        trackers: [
            {
                trackerTargets: [
                    {}, {}
                ]
            }, 
            {
                
            }
        ]
    }
}
*/
    
});
//localhost:3000/api/trackers/1

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
    // }
    
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
    models.Tracker.findById(req.params.id)
    .remove()
    .exec()
    .then(data => {
        res.send(data);
    })

})

module.exports = router;
