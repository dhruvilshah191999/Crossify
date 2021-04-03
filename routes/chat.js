var express = require('express');
var auth = require('../middleware/auth');
var mongoose = require('mongoose');
var CryptoJS = require('crypto-js');
var Cryptr = require('cryptr');
const config = require('config');
const mykey = config.get('mykey');
var cryptr = new Cryptr(mykey);
var category_details = require('../modules/interest_category');
var event_details = require('../modules/event_details');
var user_details = require('../modules/user_details');
var member_details = require('../modules/members_details');
var club_details = require('../modules/club_details');
var channel_details = require('../modules/channel_details');
const { ObjectID, ObjectId } = require('bson');
var router = express.Router();
router.post('/createRoom', async function (req, res, next) {
  var { club_id, channel_name } = req.body;
  console.log('in api');
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
// router.get('/getroomName',async function(req,res){
//   var {room_id}= req.body;

// })
router.post('/send', async function (req, res) {
  console.log(
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa'
  );
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
router.get('/getAllchat', async function (req, res) {
  var { club_id, room_id } = req.body;
  var check = channel_details.findOne(
    { _id: ObjectId(room_id), club_id: ObjectId(club_id) },
    ['messages']
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
          'Either there are no messages or you might not be part of this chatroom',
      };
      return res.status(404).send(error);
    }
  });
});
module.exports = router;
