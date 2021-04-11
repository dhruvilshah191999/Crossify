var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {ObjectID, ObjectId} = require('bson');
const config = require('config');
var Schema = require('mongoose').Schema;

var rejected_event = new Schema({
  event_id: {
    type: ObjectId,
    required: true,
  },
  user_id: {
    type: ObjectId,
    required: true,
  },
  owner_name: {
    type: String,
    required: true,
  },
  owner_photo: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  chats: {
    type: Array,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

var rejected_exports = mongoose.model('rejected_event', rejected_event);
module.exports = rejected_exports;
