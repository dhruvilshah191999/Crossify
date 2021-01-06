var express = require("express");
var auth = require("../middleware/auth");
var mongoose = require("mongoose");
var category_details = require("../modules/interest_category");
var event_details = require("../modules/event_details");
var user_details = require("../modules/user_details");
const { ObjectID, ObjectId } = require("bson");
var router = express.Router();

router.get("/get-event", async function (req, res, next) {
  var records = event_details.find({ is_active: true }).sort({ date: -1 });
  await records.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err,
      };
      return res.status(500).send(error);
    } else {
      var finaldata = {
        data: data,
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/get-tags", async function (req, res, nex) {
  var { interest } = req.body;
  let tag = [];
  var tags = category_details.find({ _id: { $in: interest } }, { tags: 1 });
  await tags.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err,
      };
      return res.status(500).send(error);
    } else {
      data.forEach((element) => {
        tag.push.apply(tag, element.tags);
      });
      const finaldata = {
        data: tag,
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

module.exports = router;
