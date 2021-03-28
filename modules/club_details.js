var mongoose = require("mongoose");
const { ObjectID, ObjectId } = require("bson");
var Schema = require("mongoose").Schema;

var clubSchema = new Schema({
  club_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator_id: {
    type: ObjectId,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  rules: {
    type: String,
    default:"no rules",
    required: true,
  },
  profile_photo: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: false,
  },
  joining_criteria: {
    type: String,
    default:"no criteria",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  channel_list: {
    type: Array,
    required: false,
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
  category_list: {
    type: Array,
    required: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    required:true,
  },
  likes:{
    type:Array,
    required:false,
  }
});

var club_exports = mongoose.model("club_details", clubSchema);

// var club = new club_exports({
//     club_name: "Kakarot Club",
//     description: "THis is cricket sport club",
//     creator_id: '5fc8ad95d21a501b601f9dbf',
//     tags: ["cricket", "club"],
//     rules: "Nothing Rules Hahahah",
//     profile_photo: "1.jpg",
//     background_photo: "2.jpg",
//     location: "Ahmedabad",
//     max_members: 50,
//     joining_criteria: "Play one time cricket",
//     category_list:[ObjectId('5fc8afd3f90e0f10f05a29bc')]
// });
// club.save();

module.exports = club_exports;
