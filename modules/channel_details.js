var mongoose = require("mongoose");
const { ObjectID, ObjectId } = require("bson");
var Schema = require("mongoose").Schema;
var channel_details = new Schema({
    channel_name:{
        type: String,
        required: true,
    },
    club_id:{
        type: ObjectId,
        required: true,
    },
    users :{
        type: Array,
        required:false
    },
    messages:[
        {
            sendby:ObjectId,
            senttime: { type: Date, default: Date.now },
            message:String
        }
    ]
})
var channel_exports = mongoose.model('channel_details', channel_details);
module.exports = channel_exports;
