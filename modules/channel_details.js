var mongoose = require("mongoose");
const { ObjectID, ObjectId } = require("bson");
var Schema = require("mongoose").Schema;
var channelSchema = new Schema({
    channel_name:{
        type: String,
        required: true,
    },
    club_id:{
        type: ObjectId,
        required: true,
    },
    messages:[
        {
            sendby:ObjectId,
            message:String,
            senttime: { type: Date, default: Date.now }
            
        }
    ]
})
var channel_exports = mongoose.model('channel_details', channelSchema);
module.exports = channel_exports;
