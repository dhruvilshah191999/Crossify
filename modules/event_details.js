var mongoose = require("mongoose");
const { ObjectID, ObjectId } = require("bson");
var Schema = require("mongoose").Schema;

var event_details = new Schema({
  event_name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
  eligibility: {
    type: String,
    required: true,
  },
  category_list: {
    type: Array,
    required: true,
  },
  oragnizer_id: {
    type: ObjectId,
    required: true,
  },
  club_id: {
    type: ObjectId,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: false,
  },
  faq: {
    type: Array,
    required: false,
  },
  volunteers_list: {
    type: Array,
    required: false,
  },
  tags: {
    type: Array,
    required: false,
  },
  visibility: {
    type: String,
    required: true,
  },
  participants_list: {
    type: Array,
    required: false,
  },
  feedbacks: {
    type: Array,
    required: false,
  },
  ending_date_registration: {
    type: Date,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  likes: {
    type: Array,
    require: false,
  },
});

var event_exports = mongoose.model("event_details", event_details);

// var event = new event_exports({
//     event_name: "Cricket Tournament",
//     photo: "1.jpg",
//     description: "Cricket Tournament",
//     location: "Sanand",
//     eligibility: "15 years Old",
//     category_list: [ObjectId('5fc8afd3f90e0f10f05a29bc')],
//     oragnizer_info: "Dhruvil Shah",
//     visibility:"All",
//     tags: ["Cricket", "Java"],
// })
// event.save();

module.exports = event_exports;
