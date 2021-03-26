var express = require("express");
var auth = require("../middleware/auth");
var mongoose = require("mongoose");
var CryptoJS = require("crypto-js");
var Cryptr = require('cryptr');
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
var {io} = require('../app');
var router = express.Router();
router.post('/send',async function (req, res) {
    var { message, user_id, room_id } = req.body;
    var encryptedMessage=cryptr.encrypt(message);
    var message_obj={
        message:encryptedMessage,
        user_id:ObjectId(user_id),
        room_id:ObjectId(room_id),
        senttime:new Date()
    }
    io.on('sendMessage',(message,callback)=>{
      var message_obj={
        message:encryptedMessage,
        user_id:ObjectId(user_id),
        room_id:ObjectId(room_id),
        senttime:new Date()
    }
        io.to(room_id).emit('message',message_obj)
        callback();
    })
    var check = channel_details.findOneAndUpdate(
      { _id:ObjectId(room_id), users: ObjectId(user_id) },
      {
          $push: { 
              messages: {
                  message : encryptedMessage,
                  sendby: ObjectId(user_id)
              }
          }
      },
      { upsert: true, new: true }
    );
    await check.exec((error, data) => {
        if (error) {
          var error = {
          is_error: true,
          message: error,
        };
        return res.status(500).send(error);
      } else if (data) {
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
})
router.get('/getRooms',async function (req, res) {
    var { club_id } = req.body;
    var check = club_details.findOne({ _id: club_id }, ['channel_list']);
    await check.exec((error, data) => {
      if (error) {
        var error = {
          is_error: true,
          message: error,
        };
        return res.status(400).send(error);
      } else if (data) {
        var finaldata = {
          is_error: false,
          data: data,
        };
        console.log(finaldata);
        return res.status(200).send(data);
      } else {
        var error = {
          is_error: true,
          message: `this id doesn't exists`,
        };
        return res.status(404).send(error);
      }
    });
})
router.get('/getParticularroom',async function(req,res){
    var {room_id}= req.body;
    var check= channel_details.findOne({_id:ObjectId(room_id)})
    await check.exec((error,data) => {
        if(error){
            var error={
                is_error: true,
                message:error
            }
            return res.status(501).send(error);
        }
        else if(data){
   
            var finaldata={
                is_error:false,
                message: data
            }
            return res.status(200).send(finaldata);
        }
        else{
            var error ={
                is_error: true,
                message: 'cannot find chat room currently with this name '
            }   
            return res.status(404).send(error);
        }    
    })
})
router.get('/getAllchat',async function (req, res) {
    var { user_id, room_id } = req.body;
    var check = roomModel.findOne(
      { _id: ObjectId(room_id), users: ObjectId(user_id) },['messages'] 
    );
    await check.exec((error,data) => {
      if (error) {
        var error = {
          is_error: true,
          message: error,
        };
        return res.status(501).send(error);
      } else if (data) {
        for(var i in data.messages){
            var message=data.messages[i].message;
            var originalmessage = cryptr.decrypt(message);
            data.messages[i].message=originalmessage;
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
  })
module.exports = router;