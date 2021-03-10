var express = require("express");
var auth = require("../middleware/auth");
var mongoose = require("mongoose");
var category_details = require("../modules/interest_category");
var event_details = require("../modules/event_details");
var user_details = require("../modules/user_details");
var club_details = require("../modules/club_details");
const { ObjectID, ObjectId } = require("bson");
var router = express.Router();

router.post("/create-club", auth, async (req, res) => {
  const formDetails = req.body;
  console.log(req.body);
  try {
    // await user_details.insertOne(formDetails);
    res.sendStatus(201);
  } catch (e) {
    res.sendStatus(300);
  }
});

module.exports = router;
