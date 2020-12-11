var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
var Schema = require("mongoose").Schema;

var user_details = new Schema({
  uid: {
    type: String,
  },
  username: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  fname: {
    type: String,
    required: false,
  },
  lname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: false,
  },
  mobile_no: {
    type: String,
    required: false,
  },
  address: {
    type: String,
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
  country: {
    type: String,
    required: false,
  },
  pincode: {
    type: Number,
    required: false,
  },
  social_info: {
    type: String,
    required: false,
  },
  interest_id: {
    type: Array,
    required: false,
  },
  profile_photo: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
  fav_club: {
    type: Array,
    required: false,
  },
  fav_event: {
    type: Array,
    required: false,
  },
  inbox: {
    type: Array,
    required: false,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
});

user_details.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, username: this.username, email: this.email },
    config.get("jwtSecret")
  );
};

var user_exports = mongoose.model("user_details", user_details);
module.exports = user_exports;

// var user = new user_exports({
//     username: "Dark_Goku",
//     password: "123456",
//     fname: "Dhruvil",
//     lname: "Shah",
//     email: "dhruvil@gmail.com",
//     mobile_no: "6354883566",
//     address: "sendhi mata",
//     city: "ahmedabad",
//     state: "Gujarat",
//     country: "India",
//     pincode: 382110,
//     interest_id: ["Cricket", "Java"],
//     profile_photo: "1.jpg",
// })
// user.save();
