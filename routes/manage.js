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
    visibility,
    pincode,
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
  var check = event_details.update(
    {
      _id: ObjectId(event_id),
      is_active: 1,
    },
    {
      event_name: event_name,
      visibility,
      location: address,
      city,
      pincode,
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
    } else if (data == null || data.length == 0) {
      var error = {
        is_error: true,
        message: "wrong event id or you may not have access to update ",
      };
      return res.status(404).send(error);
    } else {
      var finaldata = {
        update:true,
        is_error: false,
        message: "value updated succesfully",
      };
      return res.status(200).send(finaldata);
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

router.post("/get-faq", async function (req, res, next) {
  var { event_id } = req.body;
  var result = event_details.findOne({
    _id: ObjectId(event_id),
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
      data.faq.forEach((e) => {
        var d = new Date(e.date);
        var date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
        var object = {
          que: e.question,
          ownerName: e.askedby,
          date: date,
          status:e.status,
          privacy: e.privacy,
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

router.post("/publish", async function (req, res, next) {
  var { event_id, questions } = req.body;
  var check = event_details.updateMany(
    {
      _id: ObjectId(event_id),
    },
    { $set: { "faq.$[elem].privacy": "public" } },
    {
      multi: true,
      arrayFilters: [{ "elem.question": { $in: questions } }],
    }
  );
  await check.exec((error, data) => {
    if (error) {
      var err = {
        is_error: true,
        message: error.message,
      };
      return res.status(500).send(err);
    } else if (data == null || data.length == 0) {
      var err = {
        is_error: true,
        message: "wrong event details",
      };
      return res.status(404).send(err);
    } else {
      var finaldata = {
        update: true,
        is_error: false,
        message: "value has been updated",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/privatise", async function (req, res, next) {
  var { event_id, questions } = req.body;
  var check = event_details.updateMany(
    {
      _id: ObjectId(event_id),
    },
    { $set: { "faq.$[elem].privacy": "private" } },
    {
      multi: true,
      arrayFilters: [{ "elem.question": { $in: questions } }],
    }
  );
  await check.exec((error, data) => {
    if (error) {
      var err = {
        is_error: true,
        message: error.message,
      };
      return res.status(500).send(err);
    } else if (data == null || data.length == 0) {
       var err = {
         is_error: true,
         message: "wrong event details",
       };
       return res.status(404).send(err);
    } else {
      var finaldata = {
        update:true,
        is_error: false,
        message: "value has been updated",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/reject", async function (req, res, next) {
  var { event_id, questions } = req.body;
  var check = event_details.updateMany(
    {
      _id: ObjectId(event_id),
    },
    { $set: { "faq.$[elem].status": "rejected" } },
    {
      multi: true,
      arrayFilters: [{ "elem.question": { $in: questions } }],
    }
  );
  await check.exec((error, data) => {
    if (error) {
      var err = {
        is_error: true,
        message: error.message,
      };
      return res.status(500).send(err);
    } else if (data == null || data.length == 0) {
      var err = {
        is_error: true,
        message: "wrong event details",
      };
      return res.status(404).send(err);
    } else {
      var finaldata = {
        update: true,
        is_error: false,
        message: "value has been updated",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/answer", async function (req, res, next) {
  var { event_id, question, answer } = req.body;
  var check = event_details.findOneAndUpdate(
    { _id: ObjectId(event_id), "faq.question": question },
    { $set: { "faq.$.answer": answer, "faq.$.status": "answered" } }
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

router.post("/get-list", async function (req, res, next) {
  var { event_id } = req.body;
  var result = event_details.findOne({
    _id: ObjectId(event_id),
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
      async function resultdata() {
        data.participants_list.forEach(async (e) => {
          var getdata = user_details.findOne(
            { _id: ObjectId(e.user), is_active: 1 },
            { email: 1, fname: 1, lname: 1, city: 1, profile_photo: 1 }
          );
          await getdata.exec((err2, data2) => {
            if (data2) {
              var d = new Date(e.date);
              var date =
                d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
              var object = {
                id: data2._id,
                photo: data2.profile_photo,
                name: data2.fname + " " + data2.lname,
                date,
                location: data.city,
                status: e.status,
              };
              final.push(object);
            }
          });
        });
        let promise = new Promise((resolve, reject) => {
          setTimeout(() => resolve("done!"), 1000);
        });
        let result = await promise;
      }
      resultdata().then((err) => {
        var finaldata = {
          data: final,
          is_error: false,
          message: "Data Send",
        };
        return res.status(200).send(finaldata);
      })
    }
  });
});

router.post("/arrived", async function (req, res, next) {
  var { event_id, userIds } = req.body;
  userIds = userIds.map((s) => mongoose.Types.ObjectId(s));
  var check = event_details.updateMany(
    {
      _id: ObjectId(event_id),
    },
    { $set: { "participants_list.$[elem].status": "arrived" } },
    {
      multi: true,
      arrayFilters: [{ "elem.user": { $in: userIds } }],
    }
  );
  await check.exec((error, data) => {
    if (error) {
      var err = {
        is_error: true,
        message: error.message,
      };
      return res.status(500).send(err);
    } else if (data == null || data.length == 0) {
      var err = {
        is_error: true,
        message: "wrong event details",
      };
      return res.status(404).send(err);
    } else {
      var finaldata = {
        update: true,
        is_error: false,
        message: "value has been updated",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/userarrived", async function (req, res, next) {
  var {
    event_id,
    user_id
  } = req.body;

  var check = event_details.findOneAndUpdate(
    { _id: ObjectId(event_id), "participants_list.user": ObjectId(user_id) },
    { $set: { "participants_list.$.status": "Arrived" } }
  )

  await check.exec((err, data) => {
    if (err) {
      var err = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(err);
    }
    else if (data) {
      var finaldata = {
        is_error: false,
        message: "value updated succesfully"
      };
      return res.status(200).send(finaldata);
    }
    else {
      var err = {
        is_error: true,
        message: "wrong event id or you may not have access to update "
      };
      return res.status(404).send(err);
    }
  });
});

module.exports = router;
