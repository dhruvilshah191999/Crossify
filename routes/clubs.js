var express = require("express");
var auth = require("../middleware/auth");
var mongoose = require("mongoose");
var category_details = require("../modules/interest_category");
var event_details = require("../modules/event_details");
var user_details = require("../modules/user_details");
var member_details = require("../modules/members_details");
var club_details = require("../modules/club_details");
const { ObjectID, ObjectId } = require("bson");
var router = express.Router();
router.get("/get-particular-club",async function(req,res,next){
  const {club_id}= req.body;
  var check = club_details.findById({_id:ObjectId(club_id)});
  await check.exec((err,data)=>{
    if (err) {
      var error = {
        is_error: true,
        message: err,
      };
      return res.status(501).send(error);
  }
  else{
    var finaldata={
      is_error:false,
      message:data
    }
    return res.status(200).send(finaldata);
  }
  })
})
router.post("/join-club",async function(req,res,next){
    const {user_id,club_id}= req.body;
    var user_object = {
      user_id:ObjectId(user_id),
      level:"member"
    }
    var club_object = {
      club_id:ObjectId(club_id),
      level:"member"
    }
    var check = member_details.findOneAndUpdate({club_id:ObjectId(club_id),member_list:{$nin:{user_object}}},{
      $push: { member_list: user_object },
    })
    await check.exec((err,data)=>{
      if(err){
        var error = {
          is_error: true,
          message: err,
        };
        return res.status(501).send(error);
      }
      else if(data == null || data.length == 0){
          var error={
            is_error:true,
            message:"wrong club details or you are already part of this club"
          }
        return res.status(501).send(error);
      }
      else{
        async()=>{
        var update = user_details.findOneAndUpdate({_id:ObjectId(user_id),clubs:{$nin:{club_object}}},{
          $push:{clubs:club_object}
        })
        await update.exec((err,data2)=>{
          if(err){
            var error = {
              is_error: true,
              message: err,
            };
            return res.status(501).send(error);
          }
          else if(data == null || data.length == 0){
            var error={
              is_error:true,
              message:"wrong club details or you are already part of this club"
            }
            return res.status(501).send(error);
          }
          else {
            var finaldata= {
              is_error:false,
              message:"yayy..! you joined a club"
            }
            return res.status(200).send(finaldata);
          }
        })
        }
      }
    })
})
router.post("/leave-club",async function(req,res,next){
  const {user_id,club_id}= req.body;
  var user_object = {
    user_id:ObjectId(user_id),
    level:"member"
  }
  var check = member_details.findOneAndUpdate({club_id:ObjectId(club_id),member_list:{$in:{user_object}}},{
    $pull: { member_list: user_object }
  })
 
  await check.exec((err,data)=>{
    console.log(err);
    if(err){
      var error = {
        is_error: true,
        message: err,
      };
      return res.status(501).send(error);
    }
    else if(data == null || data.length == 0){
        var error={
          is_error:true,
          message:"wrong club details or you are not part of this club"
        }
      return res.status(501).send(error);
    }
    else {
      async()=>{
      var update = user_details.findOneAndUpdate({_id:ObjectId(user_id),clubs:{$nin:{club_object}}},{
        $push:{clubs:club_object}
      })
      await update.exec((err,data2)=>{
        if(err){
          var error = {
            is_error: true,
            message: err,
          };
          return res.status(501).send(error);
        }
        else if(data == null || data.length == 0){
          var error={
            is_error:true,
            message:"wrong club details or you are already part of this club"
          }
          return res.status(501).send(error);
        }
        else {
          var finaldata= {
            is_error:false,
            message:"you left this club"
          }
          return res.status(200).send(finaldata);
        }
      })
      }
    }
  })
})
router.post("/create-club",  async function(req, res,next){
  const {name,privacy,categories,user_id,profile_photo,address,city,state,postal_code,latitude,longitude,description,joining_criteria,rules,tags} = req.body;
  //console.log(req.body);
  let objectIdArray = categories.map((s) => mongoose.Types.ObjectId(s));
  var object = {
    user_id: ObjectId(user_id),
    level: "admin"
  }
  var check= club_details.findOne({club_name:name,is_active:1});
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err,
      };
      return res.status(501).send(error);
    } else if (data) {
      var error = {
        is_error: true,
        message: "This ClubName Already Taken",
      };
      return res.status(500).send(error);
    } else if (data == null || data.length == 0) {
      var club = new club_details({
        club_name:name,
        privacy:privacy,
        creator_id:ObjectId(user_id),
        profile_photo:profile_photo,
        location:address,
        category_list:objectIdArray,
        city:city,
        state:state,
        pincode:postal_code,
        latitude:latitude,
        longitude:longitude,
        description:description,
        joining_criteria:joining_criteria,
        rules:rules,
        tags:tags
      });
      club.save((err) => {
        if (err) {
          var error = {
            is_error: true,
            message: err.message,
          };
          return res.status(500).send(error);
        } else {
          var member = new member_details ({
            club_id:club._id,
            is_active:true,
            member_list:object
          })
          member.save((err)=>{
            if (err) {
              var error = {
                is_error: true,
                message: err.message,
              };
              return res.status(500).send(error);
            }else{
              var finaldata = {
            
                message: "Club Created Successfully",
                is_error: false,
              };
              return res.status(200).send(finaldata);
            }
          })
          
        }
      });
    }
  });
  
});

module.exports = router;
