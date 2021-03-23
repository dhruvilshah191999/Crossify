var express = require('express');
var auth = require('../middleware/auth');
var mongoose = require('mongoose');
var category_details = require('../modules/interest_category');
var event_details = require('../modules/event_details');
var user_details = require('../modules/user_details');
var club_details = require('../modules/club_details');
const { ObjectID, ObjectId } = require('bson');
const { json } = require('express');
var router = express.Router();

function getYs(distancearray) {
  return distancearray.map((d) => d.distance);
}

function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == 'K') {
      dist = dist * 1.609344;
    }
    if (unit == 'N') {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

router.get('/get-interest', async function (req, res, next) {
  var records = category_details.find(
    { is_active: true },
    { category_name: 1, _id: 1 }
  );
  await records.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err,
      };
      return res.status(500).send(error);
    } else {
      var finaldata = {
        data: data,
        is_error: false,
        message: 'Data Geted',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.get('/get-event', async function (req, res, next) {
  var records = event_details
    .find({ is_active: true })
    .sort({ date: -1 })
    .limit(4);
  await records.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err,
      };
      return res.status(500).send(error);
    } else {
      var finaldata = {
        data: data,
        is_error: false,
        message: 'Data Send',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.get('/get-club', async function (req, res, next) {
  var records = club_details
    .find({ is_active: true })
    .sort({ date: -1 })
    .limit(4);
  await records.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err,
      };
      return res.status(500).send(error);
    } else {
      var finaldata = {
        data: data,
        is_error: false,
        message: 'Data Send',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post('/get-event-byuser', auth, async function (req, res, next) {
  var { latitude, longitude } = req.user;
  if (latitude !== 0 && longitude !== 0) {
    var records = event_details.find({ is_active: true });
    let distancearray = [];
    let idstring = '';
    await records.exec(async (err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err,
        };
        return res.status(500).send(error);
      } else {
        data.forEach((d) => {
          let distancevalue = distance(
            d.latitude,
            d.longitude,
            latitude,
            longitude,
            'K'
          );
          let object = {
            id: d._id,
            distance: distancevalue,
          };
          if (distancearray.length < 4) {
            distancearray.push(object);
          } else {
            let maxdistance = Math.max(...getYs(distancearray));
            if (distancevalue < maxdistance) {
              distancearray = distancearray.filter(
                (d) => d.distance !== maxdistance
              );
              distancearray.push(object);
            }
          }
        });
        var eventsrecords = event_details.find({
          _id: {
            $in: [
              ObjectId(distancearray[0].id),
              ObjectId(distancearray[1].id),
              ObjectId(distancearray[2].id),
              ObjectId(distancearray[3].id),
            ],
          },
        });
        await eventsrecords.exec((err, data2) => {
          if (err) {
            var error = {
              is_error: true,
              message: err,
            };
            return res.status(500).send(error);
          } else {
            var finaldata = {
              data: data2,
              is_error: false,
              message: 'Data Send',
            };
            return res.status(200).send(finaldata);
          }
        });
      }
    });
  } else {
    var records = event_details
      .find({ is_active: true })
      .sort({ date: -1 })
      .limit(4);
    await records.exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err,
        };
        return res.status(500).send(error);
      } else {
        var finaldata = {
          data: data,
          is_error: false,
          message: 'Data Send',
        };
        return res.status(200).send(finaldata);
      }
    });
  }
});

router.post('/get-club-byuser', auth, async function (req, res, next) {
  var { latitude, longitude } = req.user;
  if (latitude !== 0 && longitude !== 0) {
    var records = club_details.find({ is_active: true });
    let distancearray = [];
    let idstring = '';
    await records.exec(async (err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err,
        };
        return res.status(500).send(error);
      } else {
        data.forEach((d) => {
          let distancevalue = distance(
            d.latitude,
            d.longitude,
            latitude,
            longitude,
            'K'
          );
          let object = {
            id: d._id,
            distance: distancevalue,
          };
          if (distancearray.length < 4) {
            distancearray.push(object);
          } else {
            let maxdistance = Math.max(...getYs(distancearray));
            if (distancevalue < maxdistance) {
              distancearray = distancearray.filter(
                (d) => d.distance !== maxdistance
              );
              distancearray.push(object);
            }
          }
        });
        var eventsrecords = club_details.find({
          _id: {
            $in: [
              ObjectId(distancearray[0].id),
              ObjectId(distancearray[1].id),
              ObjectId(distancearray[2].id),
              ObjectId(distancearray[3].id),
            ],
          },
        });
        await eventsrecords.exec((err, data2) => {
          if (err) {
            var error = {
              is_error: true,
              message: err,
            };
            return res.status(500).send(error);
          } else {
            var finaldata = {
              data: data2,
              is_error: false,
              message: 'Data Send',
            };
            return res.status(200).send(finaldata);
          }
        });
      }
    });
  } else {
    var records = club_details
      .find({ is_active: true })
      .sort({ date: -1 })
      .limit(4);
    await records.exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err,
        };
        return res.status(500).send(error);
      } else {
        var finaldata = {
          data: data,
          is_error: false,
          message: 'Data Send',
        };
        return res.status(200).send(finaldata);
      }
    });
  }
});
router.post('/add-interest', async function (req, res, next) {
  var { email, interest_array } = req.body;
  let objectIdArray = interest_array.map((s) => mongoose.Types.ObjectId(s));
  var update = user_details.findOneAndUpdate(
    { email: email, is_active: 1 },
    {
      interest_id: objectIdArray,
    }
  );
  update.exec((err, ans) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else if (!ans) {
      var error = {
        is_error: true,
        message: 'Please First Complete Registration Step 1',
      };
      return res.status(500).send(error);
    } else {
      var finaldata = {
        is_error: false,
        message: 'User Data Updated',
      };
      return res.status(200).send(finaldata);
    }
  });
});
router.post('/ask-question',async function(req,res,next){
  var {event_id,user_id,question}=req.body;
  
  try{
    var user_name = await user_details.findById({_id:ObjectId(user_id)}).then(function(data){
      return data.username;
    })
  }
  catch(e){
    console.log(e);
  }
  var object = {
    question:question,
    askedby: user_name,
    date: new Date(),
    status:"pending",
    privacy:"public"
  };
  var update=  event_details.findOneAndUpdate({_id:ObjectId(event_id)},{
    $push: { faq: object },
  })
  await update.exec((err,data)=>{
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else {
      var finaldata = {
        
        is_error: false,
        message: "Data Updated",
      };
      return res.status(200).send(finaldata);
    }
  })
})
router.post('/event-details', async function (req, res, next) {
  let { event_id } = req.body;
  let userphoto = [];
  var events = event_details.findOne({ _id: ObjectId(event_id), is_active: true });
  await events.exec(async (err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else {
      var finaldata = {
        event_data: data,
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post('/checklikes', auth, async function (req, res, next) {
  let { event_id } = req.body;
  var checks = event_details.find({
    _id: event_id,
    likes: ObjectId(req.user._id),
    is_active: 1,
  });
  await checks.exec((err, data2) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (data2.length != 0) {
      var finaldata = {
        Like: true,
        is_error: false,
        message: 'Data Send',
      };
      return res.status(200).send(finaldata);
    } else {
      var finaldata = {
        Like: false,
        is_error: false,
        message: 'Data Send',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post('/addlikes', auth, async function (req, res, next) {
  let { event_id } = req.body;
  var checks = event_details.update(
    {
      _id: event_id,
      is_active: 1,
    },
    {
      $push: { likes: ObjectId(req.user._id) },
    }
  );
  await checks.exec((err, data2) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else {
      var add = user_details.update(
        {
          _id: req.user._id,
          is_active: 1,
        },
        {
          $push: { fav_event: ObjectId(event_id) },
        }
      );
      add.exec((err, data) => {
        if (err) {
          var error = {
            is_error: true,
            message: err.message,
          };
          return res.status(600).send(error);
        }
        else {
          var finaldata = {
            Like: true,
            is_error: false,
            message: "Data Send",
          };
          return res.status(200).send(finaldata);
        }
      })
    }
  });
});

router.post('/deletelikes', auth, async function (req, res, next) {
  let { event_id } = req.body;
  var checks = event_details.update(
    {
      _id: event_id,
      is_active: 1,
    },
    {
      $pull: { likes: ObjectId(req.user._id) },
    }
  );
  await checks.exec((err, data2) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else {
      var remove = user_details.update(
        {
          _id: req.user._id,
          is_active: 1,
        },
        {
          $pull: { fav_event: ObjectId(event_id) },
        }
      );
      remove.exec((err, data) => {
        if (err) {
          var error = {
            is_error: true,
            message: err.message,
          };
          return res.status(600).send(error);
        } else {
          var finaldata = {
            Like: true,
            is_error: false,
            message: "Data Send",
          };
          return res.status(200).send(finaldata);
        }
      });
    }
  });
});
router.get("/get-userprofiles-of-events",async function(req,res,next){
  let {event_id}=req.body;
  var result= event_details.findById({_id:event_id});
  await result.exec((err,data)=>{
    if(err){
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    }
    else if(data){
      var finaldata={message:[],is_error:false}
      console.log(data);
      async function users(){
        data.participants_list.forEach(async(element) => {
          if(element.status==="arrived" || element.status==="coming"){
            var user_id=element.user;
            console.log(user_id);
            var finalresult=user_details.findById({_id:user_id})
            await finalresult.exec((err,data2)=>{
              if(err){
                var error = {
                  is_error: true,
                  message: err.message,
                };
                return res.status(600).send(error);
              }
              else if(data2){
                finaldata.message.push({profile_photo:data2.profile_photo,name:data2.username})
              }
            })
          }
        });
        let promise = new Promise((resolve, reject) => {
          setTimeout(() => resolve("done!"), 1000);
       });
        let result = await promise;     
      }
      users().then((err) => {
        
        return res.status(200).send(finaldata);
      })
    }

  })
})
router.post("/participate-event",auth,async function(req,res,next){
  let { event_id } = req.body;
  
  try{
    var data = await event_details.findById({_id:ObjectId(event_id)}).exec();
  }
  catch(e){
    console.log(e);
  }
  var max_participants= data.maximum_participants;
  var current_participants=data.current_participants;
  if(current_participants==max_participants){
    var object = {
      user: ObjectId(req.user._id),
      date: new Date(),
      status:"waiting"
    }
  }
  else{
    var object = {
      user: ObjectId(req.user._id),
      date: new Date(),
      status:"coming"
    };
  }
  if(object.status="waiting"){
    var checks = event_details.update(
      {
        _id: event_id,
        is_active: 1,
      },
      {
        $push: { participants_list: object },
      }
    );
    await checks.exec((err, data2) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(600).send(error);
      }
      else {
        var check2= user_details.findOneAndUpdate({
          _id:ObjectId(req.user._id),
          is_active:true
        },{
          $push: {events:ObjectId(event_id)}
        })
        check2.exec((err)=>{
          if(err){
            var error = {
              is_error: true,
              message: err.message,
            };
            return res.status(600).send(error);
          } else {
            var finaldata = {
              participated: true,
              is_error: false,
              message: 'Data Send',
            };
            return res.status(200).send(finaldata);
          }
        });
      }
    });
  }
  else if(object.status="coming"){
    current_participants+=1;
    var checks = event_details.update(
      {
        _id: event_id,
        is_active: 1,
      },
      {
        $push: { participants_list: object },
        current_participants:current_participants
      }
    );
    await checks.exec((err, data2) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(600).send(error);
      }
      else {
        var check2= user_details.findOneAndUpdate({
          _id:ObjectId(req.user._id),
          is_active:true
        },{
          $push: {events:ObjectId(event_id)}
        })
        check2.exec((err)=>{
          if(err){
            var error = {
              is_error: true,
              message: err.message,
            };
            return res.status(600).send(error);
          } else {
            var finaldata = {
              participated: true,
              is_error: false,
              message: 'Data Send',
            };
            return res.status(200).send(finaldata);
          }
        });
      }
    });
  }
})

router.post("/undo-participation-event",async function(req,res,next){
  let { event_id,user_id } = req.body;
  try {
    var check = await event_details.findOne({
      _id:ObjectId(event_id),
      participants_list:{$in:{user:ObjectId(user_id)}},
      "participants_list.status":"pending"
    }).exec();
  } 
  catch (e) {
    console.log(e);
  }
  console.log(check);
  if(check!=null || check.length!=0){
    var checks = event_details.update(
      {
        _id: event_id,
        is_active: 1,
      },
      {
        $pull: { participants_list: { user: ObjectId(user_id) } }
      }
    );
    await checks.exec((err, data2) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(600).send(error);
      } else {
        var check2 = user_details.findOneAndUpdate(
          {
            _id: ObjectId(user_id),
            is_active: true,
          },
          {
            $pull: { events: ObjectId(event_id) },
          }
        );
        check2.exec((err) => {
          if (err) {
            var error = {
              is_error: true,
              message: err.message,
            };
            return res.status(600).send(error);
          } else {
            var finaldata = {
              participated: false,
              is_error: false,
              message: 'Data Send',
            };
            return res.status(200).send(finaldata);
          }
        });
      }
    });
  }
  else{
    var checks = event_details.update(
      {
        _id: event_id,
        is_active: 1,
      },
      {
        $pull: { participants_list: { user: ObjectId(user_id) } },
        $inc:{current_participants:-1}
      }
    );
    await checks.exec((err, data2) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(600).send(error);
      } else {
        var check2 = user_details.findOneAndUpdate(
          {
            _id: ObjectId(user_id),
            is_active: true,
          },
          {
            $pull: { events: ObjectId(event_id) },
          }
        );
        check2.exec((err) => {
          if (err) {
            var error = {
              is_error: true,
              message: err.message,
            };
            return res.status(600).send(error);
          } else {
            var finaldata = {
              participated: false,
              is_error: false,
              message: 'Data Send',
            };
            return res.status(200).send(finaldata);
          }
        });
      }
    });
  }
})

router.post("/getclub", async function (req, res, next) {
  let { club_id } = req.body;
  console.log(club_id);
  var checks = club_details.findOne({
    _id: ObjectId(club_id),
    is_active: 1,
  });
  await checks.exec((err, data2) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else {
      var finaldata = {
        data: data2,
        is_error: false,
        message: 'Data Send',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/checkevent", auth, async function (req, res, next) {
  let { event_id } = req.body;
  var checks = event_details.find({
    _id: event_id,
    "participants_list.user":ObjectId(req.user._id),
    is_active: 1,
  });
  await checks.exec((err, data2) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if(data2.length!=0){
      var finaldata = {
        attend:true,
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
    else {
      var finaldata = {
        attend: false,
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

module.exports = router;
