var express = require("express");
var auth = require("../middleware/auth");
var mongoose = require("mongoose");
var category_details = require("../modules/interest_category");
var event_details = require("../modules/event_details");
var user_details = require("../modules/user_details");
const { ObjectID, ObjectId } = require("bson");
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
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

router.get("/get-interest", async function (req, res, next) {
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
        message: "Data Geted",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.get("/get-event", async function (req, res, next) {
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
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/get-event-byuser", auth, async function (req, res, next) {
  var { latitude, longitude } = req.user;
  if (latitude !== 0 && longitude !== 0) {
    var records = event_details.find({ is_active: true });
    let distancearray = [];
    let idstring = "";
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
            "K"
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
              message: "Data Send",
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
          message: "Data Send",
        };
        return res.status(200).send(finaldata);
      }
    });
  }
});

router.post("/add-interest", async function (req, res, next) {
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
        message: "Please First Complete Registration Step 1",
      };
      return res.status(500).send(error);
    } else {
      var finaldata = {
        is_error: false,
        message: "User Data Updated",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/event-details", async function (req, res, next) {
  let { event_id } = req.body;
  console.log(req.body);
  let userphoto = [];
  var events = event_details.findOne({ _id: event_id, is_active: true });
  await events.exec(async (err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else {
      async function getphoto() {
        var user_photo = user_details.find(
          {
            $or: [
              { _id: { $in: data.participants_list } },
              { _id: data.oragnizer_id },
            ],
            is_active: true,
          },
          { profile_photo: 1 }
        );
        await user_photo.exec((err, data2) => {
          if (err) {
            var error = {
              is_error: true,
              message: err.message,
            };
            return res.status(600).send(error);
          } else {
            userphoto = data2;
          }
        });
        let promise = new Promise((resolve, reject) => {
          setTimeout(() => resolve("done!"), 1000);
        });
        let result = await promise;
      }

      if (data.participants_list.length !== 0) {
        getphoto().then((err) => {
          if (err) {
            var error = {
              is_error: true,
              message: err.message,
            };
            return res.status(700).send(error);
          } else {
            var finaldata = {
              event_data: data,
              userphoto: userphoto,
              is_error: false,
              message: "Data Send",
            };
            return res.status(200).send(finaldata);
          }
        });
      }
    }
  });
});

module.exports = router;
