var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { ObjectID, ObjectId } = require("bson");
const config = require("config");
var Schema = require("mongoose").Schema;

var reports_details = new Schema({
  event_id: {
    type: ObjectId,
    required: true,
  },
  user_id: {
    type: ObjectId,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  reports: {
    type: Array,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

var reports_exports = mongoose.model("reports_details", reports_details);
module.exports = reports_exports;
