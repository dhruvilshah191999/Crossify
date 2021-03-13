var express = require("express");
var auth = require("../middleware/auth");
var mongoose = require("mongoose");
var category_details = require("../modules/interest_category");
var event_details = require("../modules/event_details");
var user_details = require("../modules/user_details");
var club_details = require("../modules/club_details");
const { ObjectID, ObjectId } = require("bson");
const { json } = require("express");
var router = express.Router();

router.post("/general-update", async function (req, res, next) {
  var {
    event_id,
    event_name,
    privacy,
    address,
    city,
    state,
    latitude,
    longitude,
    starting_date,
    starting_time,
    ending_date,
    ending_time,
  } = req.body;

  

  var startdate = new Date(starting_date + " " + starting_time);
  var date = new Date(ending_date + " " + ending_time);
  var check = event_details.findOneAndUpdate(
    {
      _id: ObjectId(event_id),
      is_active: 1,
    },
    {
      event_name: event_name,
      visibility: privacy,
      location: address,
      city,
      state,
      longitude,
      latitude,
      startdate,
      date,
    }
  );
  await check.exec((error, data) => {
    if (error) {
      var error = {
        is_error: true,
        message: error.message,
      };
      return res.status(400).send(error);
    } else if (data) {
      var finaldata = {
        is_error: false,
        message: "value updated succesfully",
      };
      return res.status(200).send(finaldata);
    } else {
      var error = {
        is_error: true,
        message: "wrong event id or you may not have access to update ",
      };
      return res.status(404).send(error);
    }
  });
});

router.post("/details-update", async function (req, res, next) {
  var { event_id, photo, description, eligibility, tags } = req.body;
  var check;
  if (photo != null) {
    check = event_details.update(
      {
        _id: ObjectId(event_id),
        is_active:1,
      },
      {
        photo,
        description,
        eligibility,
        tags,
      }
    );
  }
  else {
    check = event_details.update(
      {
        _id: ObjectId(event_id),
        is_active: 1,
      },
      {
        description,
        eligibility,
        tags,
      }
    );
  }
  await check.exec((error, data) => {
    if (error) {
      var error = {
        is_error: true,
        message: error.message,
      };
      return res.status(400).send(error);
    } else if (data == null || data.length == 0) {
      var error = {
        update: false,
        is_error: true,
        message: "wrong event id or you may not have access to update ",
      };
      return res.status(404).send(error);
    } else {
      var finaldata = {
        update: true,
        is_error: false,
        message: "value updated succesfully",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/Status_Update", async function (req, res, next) {
  var { event_id, user_id, status } = req.body;

  var check = event_details.findOneAndUpdate(
    {
      _id: ObjectId(event_id),
      participants_list: { $in: { user: ObjectId(user_id) } },
    },
    {
      $set: { "participants_list.$.status": status },
    }
  );

  await check.exec((err, data) => {
    if (err) {
      var err = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(err);
    } else if (data) {
      var finaldata = {
        is_error: false,
        message: "value updated succesfully",
      };
      return res.status(200).send(finaldata);
    } else {
      var err = {
        is_error: true,
        message: "wrong event id or you may not have access to update ",
      };
      return res.status(404).send(err);
    }
  });
});

module.exports = router;
