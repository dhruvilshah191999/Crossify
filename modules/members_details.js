var mongoose = require('mongoose');
const { ObjectID, ObjectId } = require('bson');
var Schema = require('mongoose').Schema;

var memberSchema = new Schema({
    club_id:{
        type: ObjectId,
        required:true
    },
    member_list: {
        type: Array,
        required:false
    },
    is_active: {
        type: Boolean,
        default:true
    },
});

var member_exports = mongoose.model('member_details', memberSchema);
module.exports = member_exports;

