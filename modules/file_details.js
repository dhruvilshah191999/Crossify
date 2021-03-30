var mongoose = require('mongoose');
const {ObjectID, ObjectId} = require('bson');
var Schema = require('mongoose').Schema;

var fileSchema = new Schema({
  club_id: {
    type: ObjectId,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  photo: {
    type: Array,
    required: false,
  },
  file: {
    type: Array,
    required: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

var file_exports = mongoose.model('file_details', fileSchema);
module.exports = file_exports;
