var express = require('express');
var auth = require('../middleware/auth');
var club_details = require('../modules/club_details');
var channel_details = require('../modules/channel_details');
const { ObjectId } = require('bson');

var router = express.Router();
router.post('/createRoom', async function (req, res, next) {
  var { club_id, channel_name, is_readable, is_writable } = req.body;
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
        is_readable: is_readable,
        is_writable: is_writable,
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
              var finaldata = {
                message: 'channel created',
                is_error: false,
              };
              return res.status(200).send(finaldata);
            }
          });
        }
      });
    } else {
      var error = {
        message: 'this room already exists',
        is_error: true,
      };
      res.status(403).send(error);
    }
  });
});

router.post('/send', async function (req, res) {
  var { messagetext, user_id, room_id, club_id } = req.body;
  var check = club_details.findOne({
    _id: ObjectId(club_id),

    $or: [
      { member_list: { $elemMatch: { user: ObjectId(user_id) } } },
      { creator_id: ObjectId(user_id) },
    ],
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
        message: 'you are not part of this club',
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
            message: 'value inserted succesfully',
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

router.post('/getMsgWithUsers', async function (req, res, next) {
  try {
    var { club_id, user_id, page, limit } = req.body;
    var is_admin = false;
    var is_member = false;
    var is_mod = false;
    var userIsPartofClub = await club_details.findOne({
      _id: ObjectId(club_id),
      $or: [
        { member_list: { $elemMatch: { user: ObjectId(user_id) } } },
        { creator_id: ObjectId(user_id) },
      ],
    });
    if (userIsPartofClub) {
      if (userIsPartofClub.creator_id == user_id) {
        is_admin = true;
      } else {
        userIsPartofClub.member_list.forEach((el) => {
          if (el.user == user_id && el.level == 'member') {
            is_member = true;
          } else if (el.user == user_id && el.level == 'moderator') {
            is_mod = true;
          }
        });
      }
    }
    if (is_member) {
      channel_details
        .aggregate([
          {
            $lookup: {
              from: 'user_details',
              localField: 'messages.user_id',
              foreignField: '_id',
              as: 'users',
            },
          },
          {
            $match: {
              club_id: ObjectId(club_id),
              is_readable: true,
            },
          },
          {
            $project: {
              'users.profile_photo': 1,
              'users._id': 1,
              'users.username': 1,
              messages: 1,
              channel_name: 1,
              is_readable: 1,
              is_writable: 1,
            },
          },
        ])
        .exec((err, chatdata) => {
          if (err) {
            console.log('in errrrr');
            var error = {
              is_error: true,
              message: err.message,
            };
            return res.status(500).send(error);
          } else if (chatdata.length != 0) {
            chatdata.forEach((element) => {
              var message_length = element.messages.length;
              var totalfloatPages = message_length / limit;
              var totalPages = Math.ceil(totalfloatPages);
              if (message_length > limit) {
                if (page == totalPages) {
                  var messagestoAppend = element.messages.slice(
                    0,
                    message_length - limit * (page - 1)
                  );
                  element.messages = messagestoAppend.slice(0);
                } else if (page < totalPages) {
                  var messagestoAppend = element.messages.slice(
                    message_length - limit * page,
                    message_length - limit * (page - 1)
                  );
                  element.messages = messagestoAppend.slice(0);
                } else {
                  element.messages = [];
                }
              } else {
                if (page > 1) {
                  element.messages = [];
                }
              }
            });
            var finaldata = {
              is_error: false,
              level: 'member',
              roomsData: chatdata,
            };
            return res.status(200).send(finaldata);
          } else {
            var error = {
              is_error: true,
              message: 'No channel found',
            };
            return res.status(404).send(error);
          }
        });
    } else {
      channel_details
        .aggregate([
          {
            $lookup: {
              from: 'user_details',
              localField: 'messages.user_id',
              foreignField: '_id',
              as: 'users',
            },
          },
          {
            $match: {
              club_id: ObjectId(club_id),
            },
          },
          {
            $project: {
              'users.profile_photo': 1,
              'users._id': 1,
              'users.username': 1,
              messages: 1,
              channel_name: 1,
              is_readable: 1,
              is_writable: 1,
            },
          },
        ])
        .exec((err, chatdata) => {
          if (err) {
            console.log('in error 1');
            var error = {
              is_error: true,
              message: err.message,
            };
            return res.status(500).send(error);
          } else if (chatdata.length != 0) {
            chatdata.forEach((element) => {
              var message_length = element.messages.length;
              var totalfloatPages = message_length / limit;
              var totalPages = Math.ceil(totalfloatPages);
              if (message_length > limit) {
                if (page == totalPages) {
                  var messagestoAppend = element.messages.slice(
                    0,
                    message_length - limit * (page - 1)
                  );
                  element.messages = messagestoAppend.slice(0);
                } else if (page < totalPages) {
                  var messagestoAppend = element.messages.slice(
                    message_length - limit * page,
                    message_length - limit * (page - 1)
                  );
                  element.messages = messagestoAppend.slice(0);
                } else {
                  element.messages = [];
                }
              } else {
                if (page > 1) {
                  element.messages = [];
                }
              }
            });
            if (is_admin) {
              var finaldata = {
                is_error: false,
                level: 'admin',
                roomsData: chatdata,
              };
              return res.status(200).send(finaldata);
            } else {
              var finaldata = {
                is_error: false,
                level: 'moderator',
                roomsData: chatdata,
              };
              return res.status(200).send(finaldata);
            }
          } else {
            var error = {
              is_error: true,
              message: 'No channel found',
            };
            return res.status(404).send(error);
          }
        });
    }
  } catch (err) {
    console.log('in catch');
    var error = {
      is_error: true,
      message: err.message,
    };
    return res.status(500).send(error);
  }
});

router.post('/getRooms', async function (req, res) {
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
      var finaldata = {
        is_error: false,
        data: data,
      };
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

router.post('/getParticularroom', async function (req, res) {
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
        message: 'cannot find chat room currently with this name ',
      };
      return res.status(404).send(error);
    }
  });
});

// router.get("/getAllchat", async function (req, res) {
//   var { club_id, room_id } = req.body;
//   var check = channel_details.findOne(
//     { _id: ObjectId(room_id), club_id: ObjectId(club_id) },
//     ["messages"]
//   );
//   await check.exec((error, data) => {
//     if (error) {
//       var error = {
//         is_error: true,
//         message: error,
//       };
//       return res.status(501).send(error);
//     } else if (data) {
//       for (var i in data.messages) {
//         var message = data.messages[i].message;
//         var originalmessage = cryptr.decrypt(message);
//         data.messages[i].message = originalmessage;
//       }
//       var finaldata = {
//         is_error: false,
//         message: data,
//       };
//       return res.status(200).send(finaldata);
//     } else {
//       var error = {
//         is_error: true,
//         message:
//           "Either there are no messages or you might not be part of this chatroom",
//       };
//       return res.status(404).send(error);
//     }
//   });
// });
module.exports = router;
