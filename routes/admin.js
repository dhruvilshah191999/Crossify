var express = require("express");
var auth = require("../middleware/auth");
var mongoose = require("mongoose");
var category_details = require("../modules/interest_category");
var event_details = require("../modules/event_details");
var user_details = require("../modules/user_details");
var club_details = require("../modules/club_details");
var member_details = require("../modules/members_details");
var file_details = require("../modules/file_details");
var channel_details = require("../modules/channel_details");
const { ObjectID, ObjectId } = require("bson");
var router = express.Router();

const countUnique = (arr) => {
  const counts = {};
  for (var i = 0; i < arr.length; i++) {
    counts[arr[i]] = 1 + (counts[arr[i]] || 0);
  }
  return counts;
};

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

router.post("/GetPhotosClub", async function (req, res, next) {
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
      var count = 1;
      var array = [];
      data.photo.forEach((e) => {
        var object = {
          id: count,
          photo: e.link,
          description: e.description,
        };
        array.push(object);
        count = count + 1;
      });
      var finaldata = {
        data: array,
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

router.post("/Promotion", auth, async function (req, res, next) {
  var { user_id, club_id, description } = req.body;
  var getdata = user_details.findOne({ _id: ObjectId(req.user._id) });
  getdata.exec(async (err, final) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    }
    var object = {
      date: new Date(),
      title: "yaay..! You got promotion 🤩",
      description: description,
      sender_id: ObjectId(req.user._id),
      photo: final.profile_photo,
      isRead: false,
    };
    var update = user_details.updateOne(
      {
        _id: ObjectId(user_id),
      },
      { $push: { inbox: object } }
    );
    await update.exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(500).send(error);
      } else if (data === null || data.length === 0) {
        var finaldata = {
          is_error: true,
          message: "Data Send",
        };
        return res.status(404).send(finaldata);
      } else {
        var check = member_details.updateOne(
          { club_id: ObjectId(club_id), "member_list.user": ObjectId(user_id) },
          { $set: { "member_list.$.level": "moderator" } }
        );
        check.exec((err, data) => {
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
      }
    });
  });
});

router.post("/Demotion", auth, async function (req, res, next) {
  var { user_id, club_id, description } = req.body;
  var getdata = user_details.findOne({ _id: ObjectId(req.user._id) });
  getdata.exec(async (err, final) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    }
    var object = {
      date: new Date(),
      title: "Oops...! you got demotion 🥺",
      description: description,
      sender_id: ObjectId(req.user._id),
      photo: final.profile_photo,
      isRead: false,
    };
    var update = user_details.updateOne(
      {
        _id: ObjectId(user_id),
      },
      { $push: { inbox: object } }
    );
    await update.exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(500).send(error);
      } else if (data === null || data.length === 0) {
        var finaldata = {
          is_error: true,
          message: "Data Send",
        };
        return res.status(404).send(finaldata);
      } else {
        var check = member_details.updateOne(
          { club_id: ObjectId(club_id), "member_list.user": ObjectId(user_id) },
          { $set: { "member_list.$.level": "member" } }
        );
        check.exec((err, data) => {
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
      }
    });
  });
});

router.post("/DeleteMember", auth, async function (req, res, next) {
  var { user_id, club_id, description } = req.body;
  var getdata = user_details.findOne({ _id: ObjectId(req.user._id) });
  getdata.exec(async (err, final) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    }
    var object = {
      date: new Date(),
      title: "Oops...! you got kicked 🥺",
      description: description,
      sender_id: ObjectId(req.user._id),
      photo: final.profile_photo,
      isRead: false,
    };
    var update = user_details.updateOne(
      {
        _id: ObjectId(user_id),
      },
      { $push: { inbox: object } }
    );
    await update.exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(500).send(error);
      } else if (data === null || data.length === 0) {
        var finaldata = {
          is_error: true,
          message: "Data Send",
        };
        return res.status(404).send(finaldata);
      } else {
        var check = member_details.updateOne(
          { club_id: ObjectId(club_id), is_active: 1 },
          { $pull: { member_list: { user: ObjectId(user_id) } } }
        );
        check.exec((err, data) => {
          if (err) {
            var err = {
              is_error: true,
              message: err.message,
            };
            return res.status(500).send(err);
          } else {
            user_details
              .updateOne(
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
      }
    });
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
      latitude: 1,
      longitude: 1,
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

router.post("/getAllEvents", async function (req, res, next) {
  var { club_id } = req.body;
  event_details
    .aggregate([
      {
        $lookup: {
          from: "user_details",
          localField: "oragnizer_id",
          foreignField: "_id",
          as: "user_data",
        },
      },
      {
        $match: {
          club_id: ObjectId(club_id),
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
        data.map((e) => {
          var status = "";
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
            event_name: e.event_name,
            event_id: e._id,
            name: e.user_data[0].fname + " " + e.user_data[0].lname,
            user_id: e.user_data[0]._id,
            date: e.date,
            location: e.city,
            status,
            data: e,
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

router.post("/getClub", async function (req, res, next) {
  var { club_id } = req.body;
  club_details
    .findOne({
      _id: ObjectId(club_id),
      is_active: true,
    })
    .exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(500).send(error);
      } else if (data) {
        var finaldata = {
          data: data,
          is_error: false,
          message: "Data Send",
        };
        return res.status(200).send(finaldata);
      } else {
        var finaldata = {
          data: {},
          is_error: false,
          message: "Data Send",
        };
        return res.status(200).send(finaldata);
      }
    });
});

router.post("/getEvent", async function (req, res, next) {
  var { event_id } = req.body;
  event_details
    .findOne({
      _id: ObjectId(event_id),
    })
    .exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(500).send(error);
      } else if (data) {
        var finaldata = {
          data: data,
          is_error: false,
          message: "Data Send",
        };
        return res.status(200).send(finaldata);
      } else {
        var finaldata = {
          data: {},
          is_error: false,
          message: "Data Send",
        };
        return res.status(200).send(finaldata);
      }
    });
});

router.post("/acceptEvent", auth, async function (req, res, next) {
  var { event_id, user_id, profile_photo, description } = req.body;
  var object = {
    date: new Date(),
    title: "Congratulations! your event just got approval🥳",
    description: description,
    sender_id: ObjectId(req.user._id),
    photo: profile_photo,
    isRead: false,
  };
  var update = user_details.updateOne(
    {
      _id: ObjectId(user_id),
    },
    { $push: { inbox: object } }
  );
  await update.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else if (data === null || data.length === 0) {
      var finaldata = {
        is_error: true,
        message: "Data Send",
      };
      return res.status(404).send(finaldata);
    } else {
      event_details
        .updateOne(
          {
            _id: ObjectId(event_id),
          },
          {
            is_active: true,
          }
        )
        .exec((err, data) => {
          if (err) {
            var error = {
              is_error: true,
              message: err.message,
            };
            return res.status(500).send(error);
          } else if (data) {
            var finaldata = {
              update: true,
              is_error: false,
              message: "Data Send",
            };
            return res.status(200).send(finaldata);
          }
        });
    }
  });
});

router.post("/rejectedEvent", auth, async function (req, res, next) {
  var { event_id, description } = req.body;
  var object = {
    send_by: ObjectId(req.user._id),
    message: description,
    date: new Date(),
  };
  var data = event_details.updateOne(
    { _id: ObjectId(event_id) },
    {
      $push: { feedbacks: object },
      is_active: false,
      visibility: "rejected",
    }
  );
  await data.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else {
      var finaldata = {
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/getCount", async function (req, res, next) {
  var { club_id } = req.body;
  var object = {};
  var event_data = await event_details
    .find({ club_id: ObjectId(club_id), is_active: true })
    .exec();
  if (event_data.length != 0) {
    object.event = event_data.length;
  } else {
    object.event = 0;
  }
  var member_data = await member_details
    .findOne({ club_id: ObjectId(club_id), is_active: true })
    .exec();

  if (member_data) {
    object.member = member_data.member_list.length;
  } else {
    object.member = 0;
  }
  var finaldata = {
    data: object,
    is_error: false,
    message: "Data Send",
  };
  return res.status(200).send(finaldata);
});

router.post("/update-club", async (req, res) => {
  const {
    club_id,
    club_name,
    privacy,
    address,
    latitude,
    longitude,
    postalcode,
    description,
    criteria,
    rules,
    state,
    city,
    photo,
    question,
  } = req.body;
  var club = club_details.updateOne(
    {
      _id: ObjectId(club_id),
      is_active: true,
    },
    {
      club_name,
      description,
      rules,
      profile_photo: photo,
      location: address,
      state,
      city,
      pincode: postalcode,
      joining_criteria: criteria,
      latitude,
      longitude,
      status: privacy,
      question,
    }
  );
  club.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else {
      var finaldata = {
        is_error: false,
        message: "Data Added",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/getRequested", async function (req, res, next) {
  var { club_id } = req.body;
  var check = user_details.find({
    club_answer: {
      $elemMatch: {
        club: ObjectId(club_id),
        status: "Pending",
      },
    },
    is_active: true,
  });
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else if (data.length != 0) {
      var array = [];
      data.forEach((e) => {
        var result = e.club_answer.filter((obj) => {
          return obj.club.equals(ObjectId(club_id));
        });
        var object = {
          photo: e.profile_photo,
          name: e.fname + " " + e.lname,
          date: result[0].date,
          occupation: e.occupation,
          status: result[0].status,
          location: e.city,
          id: e._id,
        };
        array.push(object);
      });
      var finaldata = {
        data: array,
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

router.post("/AcceptRequested", auth, async function (req, res, next) {
  var { club_id, user_id, description, profile_photo } = req.body;
  var object = {
    date: new Date(),
    title: "Congratulations! On your new role 🥳",
    description: description,
    sender_id: ObjectId(req.user._id),
    photo: profile_photo,
    isRead: false,
  };
  user_details
    .updateOne(
      { _id: ObjectId(user_id), "club_answer.club": ObjectId(club_id) },
      { $set: { "club_answer.$.status": "Approved" }, $push: { inbox: object } }
    )
    .exec();

  var object = {
    user: ObjectId(user_id),
    level: "member",
    date: new Date(),
  };
  var result = member_details.findOne({
    club_id: ObjectId(club_id),
    is_active: true,
  });
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (data === null) {
      var array = [];
      array.push(object);
      var Members = new member_details({
        club_id: ObjectId(club_id),
        is_active: true,
        member_list: array,
      });
      Members.save().then((data) => {
        user_details
          .updateOne(
            { _id: ObjectId(user_id) },
            { $push: { clubs: ObjectId(club_id) } }
          )
          .exec((err, data2) => {
            var finaldata = {
              participated: true,
              is_error: false,
              message: "Data Send",
            };
            return res.status(200).send(finaldata);
          });
      });
    } else {
      var Members = member_details.update(
        {
          club_id: ObjectId(club_id),
          is_active: true,
        },
        {
          $push: { member_list: object },
        }
      );
      Members.exec((err, data) => {
        user_details
          .updateOne(
            { _id: ObjectId(user_id) },
            { $push: { clubs: ObjectId(club_id) } }
          )
          .exec((err, data2) => {
            var finaldata = {
              participated: true,
              is_error: false,
              message: "Data Send",
            };
            return res.status(200).send(finaldata);
          });
      });
    }
  });
});

router.post("/RemoveRequested", auth, async function (req, res, next) {
  var { club_id, user_id, description, profile_photo } = req.body;
  var object = {
    date: new Date(),
    title: "offo..! You request has been rejected ☹️",
    description: description,
    sender_id: ObjectId(req.user._id),
    photo: profile_photo,
    isRead: false,
  };
  var result = user_details.updateOne(
    { _id: ObjectId(user_id), is_active: true },
    {
      $pull: { club_answer: { club: ObjectId(club_id) } },
      $push: { inbox: object },
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
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/AcceptRequests", auth, async function (req, res, next) {
  var { club_id, userArray, description, profile_photo } = req.body;
  userArray = userArray.map((s) => mongoose.Types.ObjectId(s));
  var object = {
    date: new Date(),
    title: "Congratulations! On your new role 🥳",
    description: description,
    sender_id: ObjectId(req.user._id),
    photo: profile_photo,
    isRead: false,
  };
  user_details
    .updateMany(
      { _id: { $in: userArray }, "club_answer.club": ObjectId(club_id) },
      { $set: { "club_answer.$.status": "Approved" }, $push: { inbox: object } }
    )
    .exec();

  var array = [];
  userArray.forEach((e) => {
    var object = {
      user: e,
      date: new Date(),
      level: "member",
    };
    array.push(object);
  });

  var result = member_details.findOne({
    club_id: ObjectId(club_id),
    is_active: true,
  });
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (data === null) {
      var Members = new member_details({
        club_id: ObjectId(club_id),
        is_active: true,
        member_list: array,
      });
      Members.save().then((data) => {
        user_details
          .updateMany(
            { _id: { $in: userArray } },
            { $push: { clubs: ObjectId(club_id) } }
          )
          .exec((err, data2) => {
            var finaldata = {
              participated: true,
              is_error: false,
              message: "Data Send",
            };
            return res.status(200).send(finaldata);
          });
      });
    } else {
      var Members = member_details.update(
        {
          club_id: ObjectId(club_id),
          is_active: true,
        },
        {
          $addToSet: { member_list: { $each: array } },
        }
      );
      Members.exec((err, data) => {
        user_details
          .updateMany(
            { _id: { $in: userArray } },
            { $push: { clubs: ObjectId(club_id) } }
          )
          .exec((err, data2) => {
            var finaldata = {
              participated: true,
              is_error: false,
              message: "Data Send",
            };
            return res.status(200).send(finaldata);
          });
      });
    }
  });
});

router.post("/RemoveRequests", auth, async function (req, res, next) {
  var { club_id, userArray, description, profile_photo } = req.body;
  userArray = userArray.map((s) => mongoose.Types.ObjectId(s));
  var object = {
    date: new Date(),
    title: "offo..! You request has been rejected ☹️",
    description: description,
    sender_id: ObjectId(req.user._id),
    photo: profile_photo,
    isRead: false,
  };
  var result = user_details.updateMany(
    { _id: { $in: userArray }, is_active: true },
    {
      $pull: { club_answer: { club: ObjectId(club_id) } },
      $push: { inbox: object },
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
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/Getchannel", async function (req, res, next) {
  var { club_id } = req.body;
  var data = channel_details.find({ club_id: club_id });
  await data.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else {
      var finaldata = {
        data: data.reverse(),
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/Addchannel", async function (req, res, next) {
  var { club_id, name, readable, writable, description } = req.body;
  var readOnly = false;
  var writeOnly = false;
  if (readable == "Member") {
    readOnly = true;
  }
  if (writable == "Member") {
    writeOnly = true;
  }
  var data = new channel_details({
    club_id,
    is_readable: readOnly,
    is_writable: writeOnly,
    channel_name: name,
    description,
  });
  data.save().then((data) => {
    var finaldata = {
      is_error: false,
      message: "Data Send",
    };
    return res.status(200).send(finaldata);
  });
});

router.post("/Updatechannel", async function (req, res, next) {
  var { channel_id, name, readable, writable, description } = req.body;
  var readOnly = false;
  var writeOnly = false;
  if (readable == "Member") {
    readOnly = true;
  }
  if (writable == "Member") {
    writeOnly = true;
  }
  var data = channel_details.updateOne(
    { _id: ObjectId(channel_id) },
    {
      is_readable: readOnly,
      is_writable: writeOnly,
      channel_name: name,
      description,
    }
  );
  await data.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else {
      var finaldata = {
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/removechannel", async function (req, res, next) {
  var { channel_id } = req.body;
  channel_details.remove({ _id: ObjectId(channel_id) }, function (err) {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else {
      var finaldata = {
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/ExtentionsGraphs", async function (req, res, next) {
  var { club_id } = req.body;
  var result = file_details.findOne({
    is_active: true,
    club_id: ObjectId(club_id),
  });
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (data) {
      var count = [];
      data.photo.forEach((e) => {
        var spliting = e.name.split(".");
        count.push(spliting[spliting.length - 1]);
      });
      data.file.forEach((e) => {
        var spliting = e.name.split(".");
        count.push(spliting[spliting.length - 1]);
      });
      var finaldata = {
        label: Object.keys(countUnique(count)),
        data: Object.values(countUnique(count)),
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

router.post("/getRejectedMessage", async function (req, res, next) {
  var { event_id } = req.body;
  event_details
    .aggregate([
      {
        $lookup: {
          from: "user_details",
          localField: "feedbacks.send_by",
          foreignField: "_id",
          as: "user_data",
        },
      },
      {
        $match: {
          _id: ObjectId(event_id),
        },
      },
      {
        $project: {
          "user_data.fname": 1,
          "user_data.lname": 1,
          "user_data.profile_photo": 1,
          "user_data._id": 1,
          feedbacks: 1,
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
        let members = [];
        data[0].feedbacks.map((e) => {
          var result = data[0].user_data.filter((obj) => {
            return obj._id.equals(ObjectId(e.send_by));
          });
          var object = {
            name: result[0].fname + " " + result[0].lname,
            image: result[0].profile_photo,
            message: e.message,
            date: e.date,
          };
          members.push(object);
        });
        var finaldata = {
          data: members,
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

router.post("/addMessage", auth, async function (req, res, next) {
  var { event_id, description } = req.body;
  var object = {
    send_by: ObjectId(req.user._id),
    message: description,
    date: new Date(),
  };
  var data = event_details.updateOne(
    { _id: ObjectId(event_id) },
    {
      $push: { feedbacks: object },
    }
  );
  await data.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else {
      var finaldata = {
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});
module.exports = router;
