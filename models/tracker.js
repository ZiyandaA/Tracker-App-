var mongoose = require('mongoose');


var trackerSchema = mongoose.Schema({
    userID: [{type:mongoose.Schema.ObjectId, ref: "User"}],
    name: String

})
var Tracker = mongoose.model("Tracker", trackerSchema);
module.exports = Tracker

