var express = require("express");
var auth = require("../middleware/auth");
var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var category_details = require("../modules/interest_category");
var event_details = require("../modules/event_details");
var user_details = require("../modules/user_details");
var club_details = require("../modules/club_details");
const { ObjectID, ObjectId } = require("bson");
var router = express.Router();

router.post("/get-user", auth, async function (req, res, next) {
    var result = user_details.findOne({ _id: req.user._id, is_active: 1 });
    await result.exec((err, data) => {
        if (err) {
          var error = {
            is_error: true,
            message: err.message,
          };
          return res.status(600).send(error);
        }
        else if (result == null) {
            var error = {
              is_error: true,
              message: "User Not Found",
            };
            return res.status(600).send(error);
        }
        else {
            var finaldata = {
              data:data,
              is_error: false,
              message: "Data Send",
            };
            return res.status(200).send(finaldata);
        }
    })
});

router.post("/update-user", auth, async function (req, res, next) {
  var { username, email, fname, lname, address, state, city, about_me, pincode } = req.body;
  var result = user_details.update({ _id: req.user._id, is_active: 1 }, {
    username,
    email,
    fname,
    lname,
    address,
    city,
    state,
    about_me,
    pincode
  });
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (result == null) {
      var error = {
        is_error: true,
        message: "User Not Found",
      };
      return res.status(600).send(error);
    } else {
      var finaldata = {
        update:true,
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/update-password", async function (req, res, next) {
  var {
    email,
    password,
    new_password
  } = req.body;
  var result = user_details.findOne(
    { email, is_active: 1 }
  );
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (data == null || data.length == 0) {
      var error = {
        is_error: true,
        message: "User Not Found",
      };
      return res.status(200).send(error);
    } else {
      if (bcrypt.compareSync(password, data.password)) {
        new_password = bcrypt.hashSync(new_password, 10);
        var final = user_details.update({ email, is_active: 1 }, { password:new_password });
        final.exec((err, data) => {
          if (err) {
            var error = {
              is_error: true,
              message: err.message,
            };
            return res.status(600).send(error);
          }
          else {
            var finaldata = {
              update: true,
              is_error: false,
              message: "Data Send",
            };
            return res.status(200).send(finaldata);
          }
        })
      }
      else {
        var error = {
          is_error: true,
          message: "Old Password Not Matched",
        };
        return res.status(200).send(error);
      }
    }
  });
});

router.post("/update-social", auth, async function (req, res, next) {
  var {
    facebook,
    linkedin,
    twitter,
    instagram,
  } = req.body;

  var object = {
    facebook,
    linkedin,
    twitter,
    instagram
  }

  var result = user_details.update(
    { _id: req.user._id, is_active: 1 },
    {
      social_media:object
    }
  );
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (result == null) {
      var error = {
        is_error: true,
        message: "User Not Found",
      };
      return res.status(600).send(error);
    } else {
      var finaldata = {
        update: true,
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/get-upcoming-event", auth, async function (req, res, next) {
  var result = event_details.find({
    "participants_list.user": ObjectId(req.user._id),
    date:{$gt: new Date()},
    is_active: 1
  });
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    }else {
      var finaldata = {
        data: data,
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/get-like-event", auth, async function (req, res, next) {
  var result = event_details.find({
    likes: ObjectId(req.user._id),
    is_active: 1,
  });
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
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

router.post("/get-past-event", auth, async function (req, res, next) {
  var result = event_details.find({
    "participants_list.user": ObjectId(req.user._id),
    date: { $lt: new Date() },
    is_active: 1,
  });
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
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

router.post("/get-all-event", auth, async function (req, res, next) {
  var result = event_details.find({
    oragnizer_id: ObjectId(req.user._id),
    is_active: 1,
  });
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (result == null) {
      var error = {
        is_error: true,
        message: "User Not Found",
      };
      return res.status(600).send(error);
    } else {
      var final = [];
      data.forEach((e) => {
        var status;
        if (new Date(e.date) > new Date()) {
          status = "pending";
        } else if (new Date(e.date) < new Date()) {
          status = "completed";
        }
        var object = {
          photo:e.photo,
          eventName: e.event_name,
          registerations: e.participants_list.length,
          date: e.date,
          location: e.location,
          status,
          id: e._id,
        };
        final.push(object);
      });
      var finaldata = {
        data: final,
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});


module.exports = router;