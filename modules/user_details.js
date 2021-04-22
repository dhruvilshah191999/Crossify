var mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const { ObjectId } = require("bson");
var Schema = require("mongoose").Schema;

var user_details = new Schema({
  socialId: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: false,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: false,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
  occupation: {
    type: String,
    required: false,
  },
  pincode: {
    type: Number,
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
  clubs: {
    type: Array,
    required: false,
  },
  events: {
    type: Array,
    required: false,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  about_me: {
    type: String,
    required: false,
  },
  social_media: {
    type: Object,
    required: false,
  },
  club_answer: {
    type: Array,
    required: false,
  },
  birth_date: {
    type: Date,
    required: false,
  },
  generate_code: {
    type: ObjectId,
    required: false,
  },
});

user_details.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      profile_photo: this.profile_photo,
      latitude: this.latitude,
      longitude: this.longitude,
    },
    process.env.JWTSECRET
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
