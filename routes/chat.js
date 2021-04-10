var express = require("express");
var auth = require("../middleware/auth");
var mongoose = require("mongoose");
var CryptoJS = require("crypto-js");
var Cryptr = require("cryptr");
const config = require("config");
const mykey = config.get("mykey");
var cryptr = new Cryptr(mykey);
var category_details = require("../modules/interest_category");
var event_details = require("../modules/event_details");
var user_details = require("../modules/user_details");
var member_details = require("../modules/members_details");
var club_details = require("../modules/club_details");
var channel_details = require("../modules/channel_details");
const { ObjectID, ObjectId } = require("bson");
var { io } = require("../app");
var router = express.Router();
router.post("/createRoom", async function (req, res, next) {
  var { club_id, channel_name } = req.body;
  console.log("in api");
  var check = club_details.findOne({
    _id: ObjectId(club_id),
    channel_list: { $in: channel_name },
  });
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else if (data === null || data.length === 0) {
      var channel = new channel_details({
        club_id: ObjectId(club_id),
        channel_name: channel_name,
      });
      channel.save((err, data2) => {
        if (err) {
          var error = {
            is_error: true,
            message: err.message,
          };
          return res.status(500).send(error);
        } else if (data2) {
          var final = club_details.update(
            { _id: ObjectId(club_id) },
            {
              $push: {
                channel_list: channel._id,
              },
            }
          );
          final.exec((err, data3) => {
            if (err) {
              var error = {
                is_error: true,
                message: err.message,
              };
              return res.status(500).send(error);
            } else if (data3) {
              console.log(data3);
              var finaldata = {
                message: "channel created",
                is_error: false,
              };
              return res.status(200).send(finaldata);
            }
          });
        }
      });
    } else {
      var error = {
        message: "this room already exists",
        is_error: true,
      };
      res.status(403).send(error);
    }
  });
});
// router.get('/getroomName',async function(req,res){
//   var {room_id}= req.body;

// })
router.post("/send", async function (req, res) {
  var { messagetext, user_id, room_id, club_id } = req.body;

  console.log(user_id);
  var check = member_details.findOne({
    club_id: ObjectId(club_id),
    member_list: { $elemMatch: { user: ObjectId(user_id) } },
  });
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else if (data === null || data.length === 0) {
      var error = {
        is_error: true,
        message: "you are not part of this club",
      };
      return res.status(404).send(error);
    } else {
      var update = channel_details.update(
        { _id: ObjectId(room_id) },
        {
          $push: {
            messages: {
              message: messagetext,
              user_id: ObjectId(user_id),
              senttime: new Date(),
            },
          },
        },
        { upsert: true, new: true }
      );
      update.exec((err, data2) => {
        if (err) {
          var error = {
            is_error: true,
            message: err.message,
          };
          return res.status(500).send(error);
        } else if (data2) {
          var finaldata = {
            is_error: false,
            message: "value inserted succesfully",
          };
          return res.status(200).send(finaldata);
        } else {
          var error = {
            is_error: true,
            message: "you are not part of this room or room doesn't exists",
          };
          return res.status(404).send(error);
        }
      });
    }
  });
});

router.post("/getMsgWithUsers", async function (req, res, next) {
  var { club_id } = req.body;
  channel_details
    .aggregate([
      {
        $lookup: {
          from: "user_details",
          localField: "messages.user_id",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $match: {
          club_id: ObjectId(club_id),
        },
      },
      {
        $project: {
          "users.profile_photo": 1,
          "users._id": 1,
          "users.username": 1,
          messages: 1,
          channel_name: 1,
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
        console.log(data);
        var finaldata = {
          is_error: false,
          roomsData: data,
        };
        return res.status(200).send(finaldata);
      } else {
        var error = {
          is_error: true,
          message: "No channel found",
        };
        return res.status(404).send(error);
      }
    });
});

router.post("/getAllMsgs", async function (req, res, next) {
  var { club_id } = req.body;
  const ans = await channel_details.distict("messages.user_id");
  console.log(ans);
  // .aggregate([
  //   {
  //     $lookup: {
  //       from: "user_details",
  //       localField: "member_list.user",
  //       foreignField: "_id",
  //       as: "user_data",
  //     },
  //   },
  //   {
  //     $match: {
  //       club_id: ObjectId(club_id),
  //       is_active: true,
  //     },
  //   },
  //   {
  //     $project: {
  //       "user_data.fname": 1,
  //       "user_data.lname": 1,
  //       "user_data.profile_photo": 1,
  //       "user_data._id": 1,
  //       "user_data.username": 1,
  //       member_list: 1,
  //     },
  //   },
  // ])
  // .exec((err, data) => {
  //   if (err) {
  //     var error = {
  //       is_error: true,
  //       message: err.message,
  //     };
  //     return res.status(500).send(error);
  //   } else if (data.length != 0) {
  //     let members = [];
  //     let moderator = [];
  //     data[0].member_list.map((e) => {
  //       if (e.level === "member") {
  //         var result = data[0].user_data.filter((obj) => {
  //           return obj._id.equals(ObjectId(e.user));
  //         });
  //         var object = {
  //           name: result[0].fname + " " + result[0].lname,
  //           image: result[0].profile_photo,
  //           designation: e.level,
  //           date: e.date,
  //           user_id: e.user,
  //         };
  //         members.push(object);
  //       } else {
  //         var result = data[0].user_data.filter((obj) => {
  //           return obj._id.equals(ObjectId(e.user));
  //         });
  //         var object = {
  //           name: result[0].fname + " " + result[0].lname,
  //           image: result[0].profile_photo,
  //           designation: e.level,
  //           date: e.date,
  //           user_id: e.user,
  //         };
  //         moderator.push(object);
  //       }
  //     });
  //     var final = [...members, ...moderator];
  //     var finaldata = {
  //       data: final,
  //       members,
  //       moderator,
  //       is_error: false,
  //       message: "Data Send",
  //     };
  //     return res.status(200).send(finaldata);
  //   }
  //   else {
  //     var finaldata = {
  //       data: [],
  //       members:[],
  //       moderator:[],
  //       is_error: false,
  //       message: 'Data Send',
  //     };
  //     return res.status(200).send(finaldata);
  //   }
  // });
});

router.post("/getRooms", async function (req, res) {
  var { club_id } = req.body;
  var check = channel_details.find({ club_id });
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(400).send(error);
    } else if (data) {
      // for (var i in data) {
      //   for (var j in data[i].messages) {
      //     var message = data[i].messages[j].message;
      //     var originalmessage = cryptr.decrypt(message);
      //     data[i].messages[j].message = originalmessage;
      //   }
      // }
      var finaldata = {
        is_error: false,
        data: data,
      };
      //console.log(finaldata);
      return res.status(200).send(finaldata);
    } else {
      var error = {
        is_error: true,
        message: `this id doesn't exists`,
      };
      return res.status(404).send(error);
    }
  });
});
router.post("/getParticularroom", async function (req, res) {
  var { room_id } = req.body;
  var check = channel_details.findOne({ _id: ObjectId(room_id) });
  await check.exec((error, data) => {
    if (error) {
      var error = {
        is_error: true,
        message: error,
      };
      return res.status(501).send(error);
    } else if (data) {
      var finaldata = {
        is_error: false,
        message: data,
      };
      return res.status(200).send(finaldata);
    } else {
      var error = {
        is_error: true,
        message: "cannot find chat room currently with this name ",
      };
      return res.status(404).send(error);
    }
  });
});
router.get("/getAllchat", async function (req, res) {
  var { club_id, room_id } = req.body;
  var check = channel_details.findOne(
    { _id: ObjectId(room_id), club_id: ObjectId(club_id) },
    ["messages"]
  );
  await check.exec((error, data) => {
    if (error) {
      var error = {
        is_error: true,
        message: error,
      };
      return res.status(501).send(error);
    } else if (data) {
      for (var i in data.messages) {
        var message = data.messages[i].message;
        var originalmessage = cryptr.decrypt(message);
        data.messages[i].message = originalmessage;
      }
      var finaldata = {
        is_error: false,
        message: data,
      };
      return res.status(200).send(finaldata);
    } else {
      var error = {
        is_error: true,
        message:
          "Either there are no messages or you might not be part of this chatroom",
      };
      return res.status(404).send(error);
    }
  });
});
module.exports = router;
