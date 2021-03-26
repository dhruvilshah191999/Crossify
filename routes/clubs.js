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
router.post("/create-club", auth, async (req, res) => {
  const {
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
    category,
    photo,
    tags
  } = req.body;
  var array = [];
  category.map(e => {
    array.push(ObjectId(e._id));
  })

  var club = new club_details({
    club_name,
    description,
    creator_id: req.user._id,
    tags,
    rules,
    profile_photo: photo,
    location: address,
    state,
    city,
    pincode: postalcode,
    joining_criteria: criteria,
    latitude,
    longitude,
    category_list: array,
    status:privacy
  });
  club.save().then((data) => {
    var finaldata = {
      is_error: false,
      message: "Data Added",
    };
    return res.status(200).send(finaldata);
  });
});

router.post("/get-club", auth, async (req, res) => {
  const { club_id } = req.body;
  club_details.aggregate([
    {
      $lookup: {
        from: "user_details",
        localField: "creator_id",
        foreignField: "_id",
        as: "user_data",
      },
    },
    {
      $match: {
        _id: ObjectId(club_id),
        is_active: true,
      },
    },
    {
      $project: {
        "city": 1,
        "state": 1,
        "date": 1,
        "tags": 1,
        "club_name": 1,
        "profile_photo": 1,
        "status": 1,
        "creator_id": 1,
        "user_data.fname": 1,
        "user_data.lname": 1,
        "_id": 1,
        "description": 1,
        "joining_criteria": 1,
        "rules":1
      },
    },
  ]).exec(async (err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else {
      var isAdmin = false;
      if (data[0].creator_id == req.user._id) {
        isAdmin = true;
      }
      var finaldata = {
        data: data,
        isAdmin,
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/create-event", auth, async (req, res) => {
  const {
    event_name,
    privacy,
    address,
    latitude,
    longitude,
    postalcode,
    description,
    eligibility,
    capacity,
    state,
    city,
    category,
    photo,
    tags,
    last_registraiton_date,
    starting_date,
    ending_date,
    starting_time,
    ending_time,
    club_id,
  } = req.body;
  var array = [];
  category.map((e) => {
    array.push(ObjectId(e._id));
  });
  var startdate = new Date(starting_date + " " + starting_time);
  var date = new Date(ending_date + " " + ending_time);

  var event = new event_details({
    event_name,
    photo,
    description,
    location: address,
    latitude,
    longitude,
    eligibility,
    category_list: array,
    oragnizer_id: req.user._id,
    club_id,
    date,
    tags,
    visibility: privacy,
    ending_date_registration: last_registraiton_date,
    city,
    state,
    startdate,
    pincode: postalcode,
    maximum_participants:capacity
  });
  event.save().then((data) => {
    var finaldata = {
      is_error: false,
      message: "Data Added",
    };
    return res.status(200).send(finaldata);
  });
});

module.exports = router;
