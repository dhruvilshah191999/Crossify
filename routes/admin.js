var express = require("express");
var auth = require("../middleware/auth");
var mongoose = require("mongoose");
var category_details = require("../modules/interest_category");
var event_details = require("../modules/event_details");
var user_details = require("../modules/user_details");
var club_details = require("../modules/club_details");
var member_details = require("../modules/members_details");
var file_details = require("../modules/file_details");
const { ObjectID, ObjectId } = require("bson");
var router = express.Router();

router.post("/AddPhoto", auth, async function (req, res, next) {
  var { description, photo, name, size, club_id } = req.body;
  var BytestoKB = size * 0.000977;
  var object = {
    name,
    link: photo,
    size: BytestoKB,
    date: new Date(),
    description,
    addedBy: ObjectId(req.user._id),
  };

  var check = file_details.findOne({
    club_id: ObjectId(club_id),
    is_active: 1,
  });
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else if (data) {
      file_details
        .updateOne(
          {
            club_id: ObjectId(club_id),
            is_active: 1,
          },
          {
            $push: { photo: object },
          }
        )
        .exec();
      var finaldata = {
        is_error: false,
        message: "Data Added",
      };
      return res.status(200).send(finaldata);
    } else {
      var array = [];
      array.push(object);
      var added = new file_details({
        club_id: ObjectId(club_id),
        photo: array,
      });
      added.save();
      var finaldata = {
        is_error: false,
        message: "Data Added",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/GetPhotos", async function (req, res, next) {
  var { club_id } = req.body;
  var check = file_details.findOne({
    club_id: ObjectId(club_id),
    is_active: 1,
  });
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else if (data) {
      data.photo.sort(function compare(a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        return dateB - dateA;
      });
      var finaldata = {
        data: data.photo,
        is_error: false,
        message: "Data Added",
      };
      return res.status(200).send(finaldata);
    } else {
      var finaldata = {
        data: [],
        is_error: false,
        message: "Data Added",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/DeletePhoto", async function (req, res, next) {
  var { club_id, link } = req.body;
  var check = file_details.updateOne(
    {
      club_id: ObjectId(club_id),
      is_active: 1,
    },
    {
      $pull: {
        photo: { link: link },
      },
    }
  );
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else if (data) {
      var finaldata = {
        remove: true,
        is_error: false,
        message: "Data Added",
      };
      return res.status(200).send(finaldata);
    } else {
      var finaldata = {
        remove: false,
        is_error: false,
        message: "Data Added",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/EditPhoto", async function (req, res, next) {
  var { description, photo, name, size, club_id, link } = req.body;
  console.log(req.body);
  var check = file_details.updateMany(
    {
      club_id: ObjectId(club_id),
      is_active: 1,
    },
    {
      $set: {
        "photo.$[elem].description": description,
        "photo.$[elem].link": photo,
        "photo.$[elem].name": name,
        "photo.$[elem].size": size,
        "photo.$[elem].date": new Date(),
      },
    },
    {
      multi: true,
      arrayFilters: [{ "elem.link": link }],
    }
  );
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else {
      var finaldata = {
        update: true,
        is_error: false,
        message: "Data Added",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/AddFile", auth, async function (req, res, next) {
  var { description, file, name, size, club_id } = req.body;
  var BytestoKB = size * 0.000977;
  var object = {
    name,
    link: file,
    size: BytestoKB,
    date: new Date(),
    description,
    addedBy: ObjectId(req.user._id),
  };

  var check = file_details.findOne({
    club_id: ObjectId(club_id),
    is_active: 1,
  });
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else if (data) {
      file_details
        .updateOne(
          {
            club_id: ObjectId(club_id),
            is_active: 1,
          },
          {
            $push: { file: object },
          }
        )
        .exec();
      var finaldata = {
        is_error: false,
        message: "Data Added",
      };
      return res.status(200).send(finaldata);
    } else {
      var array = [];
      array.push(object);
      var added = new file_details({
        club_id: ObjectId(club_id),
        file: array,
      });
      added.save();
      var finaldata = {
        is_error: false,
        message: "Data Added",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/GetFiles", async function (req, res, next) {
  var { club_id } = req.body;
  var check = file_details.findOne({
    club_id: ObjectId(club_id),
    is_active: 1,
  });
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else if (data) {
      data.file.sort(function compare(a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        return dateB - dateA;
      });
      var finaldata = {
        data: data.file,
        is_error: false,
        message: "Data Added",
      };
      return res.status(200).send(finaldata);
    } else {
      var finaldata = {
        data: [],
        is_error: false,
        message: "Data Added",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/DeleteFile", async function (req, res, next) {
  var { club_id, link } = req.body;
  var check = file_details.updateOne(
    {
      club_id: ObjectId(club_id),
      is_active: 1,
    },
    {
      $pull: {
        file: { link: link },
      },
    }
  );
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else if (data) {
      var finaldata = {
        remove: true,
        is_error: false,
        message: "Data Added",
      };
      return res.status(200).send(finaldata);
    } else {
      var finaldata = {
        remove: false,
        is_error: false,
        message: "Data Added",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/GetMembers", async function (req, res, next) {
  var { club_id } = req.body;
  member_details
    .aggregate([
      {
        $lookup: {
          from: "user_details",
          localField: "member_list.user",
          foreignField: "_id",
          as: "user_data",
        },
      },
      {
        $lookup: {
          from: "event_details",
          localField: "member_list.user",
          foreignField: "oragnizer_id",
          as: "events",
        },
      },
      {
        $match: {
          club_id: ObjectId(club_id),
          is_active: true,
        },
      },
      {
        $project: {
          "user_data.fname": 1,
          "user_data.lname": 1,
          "user_data._id": 1,
          "user_data.city": 1,
          member_list: 1,
          events: 1,
        },
      },
    ])
    .exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(500).send(error);
      } else if (data.length != 0) {
        var array = [];
        data[0].member_list.map((e) => {
          var result = data[0].user_data.filter((obj) => {
            return obj._id.equals(ObjectId(e.user));
          });
          var event_list = data[0].events.filter((obj) => {
            return obj.oragnizer_id.equals(ObjectId(e.user));
          });
          var object = {
            name: result[0].fname + " " + result[0].lname,
            user_id: e.user,
            date: e.date,
            location: result[0].city,
            role: e.level,
            event: event_list.length,
          };
          array.push(object);
        });
        var finaldata = {
          data: array,
          is_error: false,
          message: "Data Send",
        };
        return res.status(200).send(finaldata);
      } else {
        var finaldata = {
          data: [],
          is_error: false,
          message: "Data Send",
        };
        return res.status(200).send(finaldata);
      }
    });
});

router.post("/MyProfile", async function (req, res, next) {
  var { user_id } = req.body;
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
    } else if (data === null && data.length === 0) {
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

router.post("/get-photo-name", async function (req, res, next) {
  var { user_id } = req.body;
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

router.post("/Promotion", async function (req, res, next) {
  var { user_id, club_id } = req.body;
  console.log(req.body);
  var check = member_details.update(
    { club_id: ObjectId(club_id), "member_list.user": ObjectId(user_id) },
    { $set: { "member_list.$.level": "moderator" } }
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

router.post("/Demotion", async function (req, res, next) {
  var { user_id, club_id } = req.body;
  var check = member_details.update(
    { club_id: ObjectId(club_id), "member_list.user": ObjectId(user_id) },
    { $set: { "member_list.$.level": "member" } }
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

router.post("/DeleteMember", async function (req, res, next) {
  var { user_id, club_id } = req.body;
  var check = member_details.update(
    { club_id: ObjectId(club_id), is_active: 1 },
    { $pull: { member_list: { user: ObjectId(user_id) } } }
  );
  await check.exec((err, data) => {
    if (err) {
      var err = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(err);
    } else {
      user_details
        .update(
          {
            _id: ObjectId(user_id),
            is_active: 1,
          },
          {
            $pull: { clubs: ObjectId(club_id) },
          }
        )
        .exec();
      var finaldata = {
        is_error: false,
        message: "value updated succesfully",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/get-upcoming-event", async function (req, res, next) {
  var { club_id } = req.body;
  var result = event_details.find(
    {
      club_id: ObjectId(club_id),
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
      startdate: 1,
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
      console.log(data);
      var finaldata = {
        data: data,
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/get-past-event", async function (req, res, next) {
  var { club_id } = req.body;
  var result = event_details.find(
    {
      club_id: ObjectId(club_id),
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

router.post("/LocationGraphs", async function (req, res, next) {
  var { club_id } = req.body;
  var result = user_details.aggregate([
    {
      $match: {
        clubs: ObjectId(club_id),
      },
    },
    {
      $group: {
        _id: "$city",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $limit: 5,
    },
  ]);
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (data.length != 0) {
      var label = [];
      var count = [];
      data.forEach((e) => {
        label.push(e._id);
        count.push(e.count);
      });
      var finaldata = {
        label,
        data: count,
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    } else {
      var finaldata = {
        label: [],
        data: [],
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/BarGraphs", async function (req, res, next) {
  var { club_id } = req.body;
  var result = event_details.aggregate([
    {
      $match: {
        club_id: ObjectId(club_id),
      },
    },
    { $unwind: "$tags" },
    { $sortByCount: "$tags" },
    {
      $sort: { count: -1 },
    },
    {
      $limit: 5,
    },
  ]);
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (data.length != 0) {
      var label = [];
      var count = [];
      data.forEach((e) => {
        label.push(e._id);
        count.push(e.count);
      });
      var finaldata = {
        label,
        data: count,
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    } else {
      var finaldata = {
        label: [],
        data: [],
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

module.exports = router;
