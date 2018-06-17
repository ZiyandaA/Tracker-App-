var mongoose = require('mongoose');


var tracktargetSchema = mongoose.Schema({
    trackerID: [{type:mongoose.Schema.ObjectId, ref: "Tracker"}],
    name: String,
    target:String,
    value:mongoose.Schema.Types.Mixed,
    date:Date,

})
var TrackerTarget = mongoose.model("TrackerTarget", tracktargetSchema);
module.exports = TrackerTarget;
