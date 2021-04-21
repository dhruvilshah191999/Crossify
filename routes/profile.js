var express = require("express");
var auth = require("../middleware/auth");
var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var category_details = require("../modules/interest_category");
var event_details = require("../modules/event_details");
var user_details = require("../modules/user_details");
var club_details = require("../modules/club_details");
var members_details = require("../modules/members_details");
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
    } else if (result === null) {
      var error = {
        is_error: true,
        message: "User Not Found",
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

router.post("/get-profile-user", auth, async function (req, res, next) {
  user_details
    .aggregate([
      {
        $lookup: {
          from: "category_details",
          localField: "interest_id",
          foreignField: "_id",
          as: "category_data",
        },
      },
      {
        $match: {
          _id: ObjectId(req.user._id),
          is_active: true,
        },
      },
    ])
    .exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(600).send(error);
      } else if (data.length === 0) {
        var error = {
          is_error: true,
          message: "User Not Found",
        };
        return res.status(600).send(error);
      } else {
        var finaldata = {
          data: data[0],
          is_error: false,
          message: "Data Send",
        };
        return res.status(200).send(finaldata);
      }
    });
});

router.post("/update-user", auth, async function (req, res, next) {
  var {
    username,
    email,
    fname,
    lname,
    address,
    state,
    city,
    about_me,
    pincode,
    occupation,
    category,
    photo,
  } = req.body;
  let objectIdArray = category.map((s) => ObjectId(s._id));
  var result = user_details.updateOne(
    { _id: req.user._id, is_active: 1 },
    {
      username,
      email,
      fname,
      lname,
      address,
      city,
      state,
      about_me,
      pincode,
      occupation,
      interest_id: objectIdArray,
      profile_photo: photo,
    }
  );
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (result === null) {
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

router.post("/update-password", async function (req, res, next) {
  var { email, password, new_password } = req.body;
  var result = user_details.findOne({ email, is_active: 1 });
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (data === null || data.length === 0) {
      var error = {
        is_error: true,
        message: "User Not Found",
      };
      return res.status(200).send(error);
    } else {
      if (bcrypt.compareSync(password, data.password)) {
        new_password = bcrypt.hashSync(new_password, 10);
        var final = user_details.updateOne(
          { email, is_active: 1 },
          { password: new_password }
        );
        final.exec((err, data) => {
          if (err) {
            var error = {
              is_error: true,
              message: err.message,
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
      } else {
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
  var { facebook, linkedin, twitter, instagram } = req.body;

  var object = {
    facebook,
    linkedin,
    twitter,
    instagram,
  };

  var result = user_details.updateOne(
    { _id: req.user._id, is_active: 1 },
    {
      social_media: object,
    }
  );
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (result === null) {
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
  var result = event_details.find(
    {
      "participants_list.user": ObjectId(req.user._id),
      date: { $gt: new Date() },
      is_active: 1,
    },
    {
      _id: 1,
      city: 1,
      location: 1,
      date: 1,
      photo: 1,
      tags: 1,
      event_name: 1,
    }
  );
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

router.post("/get-like-event", auth, async function (req, res, next) {
  var result = event_details.find(
    {
      likes: ObjectId(req.user._id),
      is_active: 1,
    },
    {
      _id: 1,
      city: 1,
      location: 1,
      date: 1,
      photo: 1,
      tags: 1,
      event_name: 1,
    }
  );
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
  var result = event_details.find(
    {
      "participants_list.user": ObjectId(req.user._id),
      date: { $lt: new Date() },
      is_active: 1,
    },
    {
      _id: 1,
      city: 1,
      location: 1,
      date: 1,
      photo: 1,
      tags: 1,
      event_name: 1,
    }
  );
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
  });
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (result === null) {
      var error = {
        is_error: true,
        message: "User Not Found",
      };
      return res.status(600).send(error);
    } else {
      var final = [];
      data.forEach((e) => {
        var status;
        if (new Date(e.date) > new Date() && e.is_active) {
          status = "approved";
        } else if (new Date(e.date) < new Date() && e.is_active) {
          status = "completed";
        } else if (e.visibility != "rejected" && !e.is_active) {
          status = "pending";
        } else {
          status = "rejected";
        }
        var object = {
          photo: e.photo,
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

router.get("/get-photo-name", async function (req, res, next) {
  var { user_id } = req.body;
  var result = club_details.find({
    creator_id: user_id,
  });
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (data == null || data.length == 0) {
      var error = {
        check: false,
        is_error: true,
        message: "You hasn't created any club",
      };
      return res.status(200).send(error);
    } else {
      if (data instanceof Array) {
        var finaldata = { message: [], is_error: false };

        data.forEach((element) => {
          finaldata.message.push({
            profile_photo: element.profile_photo,
            club_name: element.club_name,
          });
        });
        return res.status(200).send(finaldata);
      } else {
        var finaldata = {
          message: {
            profile_photo: data.profile_photo,
            club_name: data.club_name,
          },
          is_error: false,
        };
        return res.status(200).send(finaldata);
      }
    }
  });
});

router.post("/check-event", auth, async function (req, res, next) {
  var { event_id } = req.body;
  if (event_id.length != 24) {
    var error = {
      check: false,
      is_error: true,
      message: "User Not Found",
    };
    return res.status(200).send(error);
  } else {
    var result = event_details.findOne({
      _id: ObjectId(event_id),
      oragnizer_id: ObjectId(req.user._id),
    });
    await result.exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(600).send(error);
      } else if (!data) {
        var error = {
          check: false,
          is_error: true,
          message: "User Not Found",
        };
        return res.status(200).send(error);
      } else {
        var finaldata = {
          check: true,
          is_error: false,
          message: "Data Send",
        };
        return res.status(200).send(finaldata);
      }
    });
  }
});

router.post("/MyProfile", auth, async function (req, res, next) {
  var check = user_details.findOne(
    { _id: ObjectId(req.user._id) },
    {
      _id: 0,
      fav_club: 0,
      fav_event: 0,
      inbox: 0,
      clubs: 0,
      events: 0,
      password: 0,
    }
  );

  await check.exec(async (err, data) => {
    if (err) {
      var err = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(err);
    } else if (data == null && data.length == 0) {
      var err = {
        is_error: true,
        message: "wrong event id or you may not have access to update ",
      };
      return res.status(404).send(err);
    } else {
      let tag = [];
      var tags = category_details.find(
        { _id: { $in: data.interest_id } },
        { tags: 1 }
      );
      await tags.exec((err, data2) => {
        if (err) {
          var error = {
            is_error: true,
            message: err,
          };
          return res.status(500).send(error);
        } else {
          data2.forEach((element) => {
            tag.push.apply(tag, element.tags);
          });
          var finaldata = {
            data: data,
            tag: tag,
            is_error: false,
            message: "value send succesfully",
          };
          return res.status(200).send(finaldata);
        }
      });
    }
  });
});

router.post("/MemberProfile", async function (req, res, next) {
  const { user_id } = req.body;
  var check = user_details.findOne(
    { _id: ObjectId(user_id) },
    {
      _id: 0,
      fav_club: 0,
      fav_event: 0,
      inbox: 0,
      clubs: 0,
      events: 0,
      password: 0,
    }
  );

  await check.exec(async (err, data) => {
    if (err) {
      var err = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(err);
    } else if (data == null) {
      var err = {
        is_error: true,
        message: "wrong event id or you may not have access to update ",
      };
      return res.status(404).send(err);
    } else {
      let tag = [];
      var tags = category_details.find(
        { _id: { $in: data.interest_id } },
        { tags: 1 }
      );
      await tags.exec((err, data2) => {
        if (err) {
          var error = {
            is_error: true,
            message: err,
          };
          return res.status(500).send(error);
        } else {
          data2.forEach((element) => {
            tag.push.apply(tag, element.tags);
          });
          var finaldata = {
            data: data,
            tag: tag,
            is_error: false,
            message: "value send succesfully",
          };
          return res.status(200).send(finaldata);
        }
      });
    }
  });
});

router.post("/member-admin", async function (req, res, next) {
  const { user_id } = req.body;
  var result = club_details.find({
    creator_id: ObjectId(user_id),
  });
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (data === null || data.length === 0) {
      var error = {
        check: false,
        is_error: true,
        message: "You hasn't created any club",
      };
      return res.status(200).send(error);
    } else {
      var finaldata = { message: [], is_error: false };
      data.forEach((element) => {
        finaldata.message.push({
          profile_photo: element.profile_photo,
          club_name: element.club_name,
        });
      });
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/get-photo-name", auth, async function (req, res, next) {
  var result = club_details.find({
    creator_id: ObjectId(req.user._id),
  });
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (data === null || data.length === 0) {
      var error = {
        check: false,
        is_error: true,
        message: "You hasn't created any club",
      };
      return res.status(200).send(error);
    } else {
      var finaldata = { message: [], is_error: false };
      data.forEach((element) => {
        finaldata.message.push({
          profile_photo: element.profile_photo,
          club_name: element.club_name,
        });
      });
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/get-like-club", auth, async function (req, res, next) {
  var result = club_details.find(
    {
      likes: ObjectId(req.user._id),
      is_active: 1,
    },
    {
      _id: 1,
      city: 1,
      location: 1,
      profile_photo: 1,
      tags: 1,
      club_name: 1,
    }
  );
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

router.post("/get-join-club", auth, async function (req, res, next) {
  members_details
    .aggregate([
      {
        $lookup: {
          from: "club_details",
          localField: "club_id",
          foreignField: "_id",
          as: "club_data",
        },
      },
      {
        $match: {
          "member_list.user": ObjectId(req.user._id),
          is_active: true,
        },
      },
      {
        $project: {
          "club_data._id": 1,
          "club_data.city": 1,
          "club_data.location": 1,
          "club_data.profile_photo": 1,
          "club_data.tags": 1,
          "club_data.club_name": 1,
        },
      },
    ])
    .exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(600).send(error);
      } else {
        var array = [];
        data.forEach((e) => {
          array.push(e.club_data[0]);
        });

        var finaldata = {
          data: array,
          is_error: false,
          message: "Data Send",
        };
        return res.status(200).send(finaldata);
      }
    });
});

router.post("/get-manage-club", auth, async function (req, res, next) {
  var result = club_details.find(
    {
      creator_id: ObjectId(req.user._id),
      is_active: 1,
    },
    {
      _id: 1,
      city: 1,
      location: 1,
      profile_photo: 1,
      tags: 1,
      club_name: 1,
    }
  );
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

router.post("/event-details", async function (req, res, next) {
  let { event_id } = req.body;
  event_details
    .aggregate([
      {
        $lookup: {
          from: "club_details",
          localField: "club_id",
          foreignField: "_id",
          as: "club_details",
        },
      },
      {
        $match: {
          _id: mongoose.Types.ObjectId(event_id),
        },
      },
    ])
    .exec(async (err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(500).send(error);
      } else {
        var finaldata = {
          event_data: data[0],
          is_error: false,
          message: "Data Send",
        };
        return res.status(200).send(finaldata);
      }
    });
});

module.exports = router;
