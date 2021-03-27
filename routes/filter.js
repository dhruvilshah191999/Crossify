var express = require("express");
var auth = require("../middleware/auth");
var mongoose = require("mongoose");
var category_details = require("../modules/interest_category");
var event_details = require("../modules/event_details");
var user_details = require("../modules/user_details");
var club_details = require("../modules/club_details");
var member_details = require("../modules/members_details");
const { ObjectID, ObjectId } = require("bson");
const c = require("config");
var router = express.Router();

function getdistance(lat1, lon1, lat2, lon2, unit) {
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

router.get("/get-event", async function (req, res, next) {
  var records = event_details.find({ is_active: true }).sort({ date: -1 });
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

router.get("/get-club", async function (req, res, next) {
  var records = club_details.find({ is_active: true }).sort({ date: -1 });
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

router.post("/get-tags", async function (req, res, nex) {
  var { interest } = req.body;
  let tag = [];
  var tags = category_details.find({ _id: { $in: interest } }, { tags: 1 });
  await tags.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err,
      };
      return res.status(500).send(error);
    } else {
      data.forEach((element) => {
        tag.push.apply(tag, element.tags);
      });
      const finaldata = {
        data: tag,
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/", async function (req, res, nex) {
  var {
    interestarray,
    distance,
    startdate,
    enddate,
    latitude,
    longitude,
  } = req.body;
  var query;
  var distancearray = [];
  const today =
    new Date().getFullYear() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getDate();

  const startingDate =
    new Date(startdate).getFullYear() +
    "/" +
    (new Date(startdate).getMonth() + 1) +
    "/" +
    new Date(startdate).getDate();

  const endingDate =
    new Date(enddate).getFullYear() +
    "/" +
    (new Date(enddate).getMonth() + 1) +
    "/" +
    new Date(enddate).getDate();

  if (interestarray.length !== 0) {
    interest_array = interestarray.map((s) => mongoose.Types.ObjectId(s));
    if (startingDate !== today && endingDate !== today) {
      query = event_details.find({
        is_active: true,
        category_list: {
          $in: interest_array,
        },
        date: { $gt: startingDate, $lt: endingDate },
      });
    } else if (startingDate === today && endingDate !== today) {
      query = event_details.find({
        is_active: true,
        category_list: {
          $in: interest_array,
        },
        date: { $lt: endingDate },
      });
    } else if (startingDate !== today && endingDate === today) {
      query = event_details.find({
        is_active: true,
        category_list: {
          $in: interest_array,
        },
        date: { $gt: startingDate },
      });
    } else {
      query = event_details.find({
        is_active: true,
        category_list: {
          $in: interest_array,
        },
      });
    }
  } else {
    if (startingDate !== today && endingDate !== today) {
      query = event_details.find({
        date: { $gt: startingDate, $lt: endingDate },
        is_active: true,
      });
    } else if (startingDate === today && endingDate !== today) {
      query = event_details.find({
        date: { $lt: endingDate },
        is_active: true,
      });
    } else if (startingDate !== today && endingDate === today) {
      query = event_details.find({
        date: { $gt: startingDate },
        is_active: true,
      });
    } else {
      query = event_details.find({ is_active: true });
    }
  }
  query.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err,
      };
      return res.status(500).send(error);
    } else if (distance === 0 || distance === "" || distance === "") {
      var finaldata = {
        data: data,
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    } else if (latitude === 0 || longitude === 0) {
      var finaldata = {
        data: data,
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    } else {
      data.forEach((d) => {
        let distancevalue = getdistance(
          latitude,
          longitude,
          d.latitude,
          d.longitude,
          "K"
        );
        if (distancevalue <= distance) distancearray.push(d);
      });
      var finaldata = {
        data: distancearray,
        is_error: false,
        message: "Data Send",
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post("/search", async function (req, res, nex) {
  var { search, location } = req.body;
  let categoryarray = [];

  if((search==null || search=="") && (location==null || location=="")){
    search=" ";
  }
  async function getids() {
    var ids = category_details.find(
      {
        $or: [
          { category_name: { $regex: ".*" + search + ".*", $options: "i" } },
          { description: { $regex: ".*" + search + ".*", $options: "i" } },
        ],
      },
      { _id: 1 }
    );

    await ids.exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err,
        };
        return res.status(500).send(error);
      } else {
        data.forEach((d) => {
          categoryarray.push(ObjectId(d._id));
        });
      }
    });

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 1000);
    });
    let result = await promise;
  }

  getids().then(async (err) => {
    if (err) {
      var error = {
        is_error: true,
        message: err,
      };
      return res.status(500).send(error);
    } else {
      var tags;
      if (location === "") {
        tags = event_details.find({
          $or: [
            {
              event_name: {
                $regex: ".*" + search + ".*",
                $options: "i",
              },
            },
            { description: { $regex: ".*" + search + ".*", $options: "i" } },
            { category_list: { $in: categoryarray } },
          ],
          is_active: true,
        });
      } else if (search === "" && location !== "") {
        tags = event_details.find({
          $or: [
            { location: { $regex: ".*" + location + ".*", $options: "i" } },
            { city: { $regex: ".*" + location + ".*", $options: "i" } },
            { state: { $regex: ".*" + location + ".*", $options: "i" } },
          ],
          is_active: true,
        });
      } else {
        tags = event_details.find({
          $or: [
            {
              event_name: {
                $regex: ".*" + search + ".*",
                $options: "i",
              },
            },
            { description: { $regex: ".*" + search + ".*", $options: "i" } },
            { location: { $regex: ".*" + location + ".*", $options: "i" } },
            { city: { $regex: ".*" + location + ".*", $options: "i" } },
            { state: { $regex: ".*" + location + ".*", $options: "i" } },
            { category_list: { $in: categoryarray } },
          ],
          is_active: true,
        });
      }
      await tags.exec((err, data) => {
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
});

router.post("/searchclub", async function (req, res, nex) {
  var { search, location } = req.body;
  let categoryarray = [];

  if((search==null || search=="") && (location==null || location=="")){
    search=" ";
  }
  async function getids() {
    var ids = category_details.find(
      {
        $or: [
          { category_name: { $regex: ".*" + search + ".*", $options: "i" } },
          { description: { $regex: ".*" + search + ".*", $options: "i" } },
        ],
      },
      { _id: 1 }
    );

    await ids.exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err,
        };
        return res.status(500).send(error);
      } else {
        data.forEach((d) => {
          categoryarray.push(ObjectId(d._id));
        });
      }
    });

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 1000);
    });
    let result = await promise;
  }

  getids().then(async (err) => {
    if (err) {
      var error = {
        is_error: true,
        message: err,
      };
      return res.status(500).send(error);
    } else {
      var tags;
      if (location === "") {
        tags = club_details.find({
          $or: [
            {
              club_name: {
                $regex: ".*" + search + ".*",
                $options: "i",
              },
            },
            { description: { $regex: ".*" + search + ".*", $options: "i" } },
            { category_list: { $in: categoryarray } },
          ],
          is_active: true,
        });
      } else if (search === "" && location !== "") {
        tags = club_details.find({
          $or: [
            { location: { $regex: ".*" + location + ".*", $options: "i" } },
            { city: { $regex: ".*" + location + ".*", $options: "i" } },
            { state: { $regex: ".*" + location + ".*", $options: "i" } },
          ],
          is_active: true,
        });
      } else {
        tags = club_details.find({
          $or: [
            {
              club_name: {
                $regex: ".*" + search + ".*",
                $options: "i",
              },
            },
            { description: { $regex: ".*" + search + ".*", $options: "i" } },
            { location: { $regex: ".*" + location + ".*", $options: "i" } },
            { city: { $regex: ".*" + location + ".*", $options: "i" } },
            { state: { $regex: ".*" + location + ".*", $options: "i" } },
            { category_list: { $in: categoryarray } },
          ],
          is_active: true,
        });
      }
      await tags.exec((err, data) => {
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
});

router.post("/club", async function (req, res, nex) {
  var {
    interestarray,
    distance,
    latitude,
    longitude,
    member
  } = req.body;
  var query;
  var distancearray = [];
  var memberarray = [];

  async function getids() {
    var get_member = member_details.find({ is_active: 1 });
    get_member.exec((err, data) => {
      data.forEach((e) => {
        if (
          e.member_list.length >= member[0] &&
          e.member_list.length <= member[1]
        ) {
          memberarray.push(e.club_id);
        }
      })
    })
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 1000);
    });
    let result = await promise;
  }

  getids().then(async (err) => {
    if (err) {
      var error = {
        is_error: true,
        message: err,
      };
      return res.status(500).send(error);
    } else {
      if (interestarray.length !== 0) {
        interest_array = interestarray.map((s) => mongoose.Types.ObjectId(s));
        if (memberarray.length !== 0) {
          memberarray = memberarray.map((s) => mongoose.Types.ObjectId(s));
          query = club_details.find({
            is_active: true,
            category_list: {
              $in: interest_array,
            },
            _id: {
              $in:memberarray
            }
          });
        }
        else {
          query = club_details.find({
            is_active: true,
            category_list: {
              $in: interest_array,
            }
          });
        }
      }
      else {
        if (memberarray.length !== 0) {
          memberarray = memberarray.map((s) => mongoose.Types.ObjectId(s));
          query = club_details.find({
            is_active: true,
            _id: {
              $in: memberarray,
            },
          });
        } else {
          query = club_details.find({
            is_active: true,
          });
        }
      }
    }

    query.exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err,
        };
        return res.status(500).send(error);
      } else if (distance === 0 || distance === "" || distance === "") {
        var finaldata = {
          data: data,
          is_error: false,
          message: "Data Send",
        };
        return res.status(200).send(finaldata);
      } else if (latitude === 0 || longitude === 0) {
        var finaldata = {
          data: data,
          is_error: false,
          message: "Data Send",
        };
        return res.status(200).send(finaldata);
      } else {
        data.forEach((d) => {
          let distancevalue = getdistance(
            latitude,
            longitude,
            d.latitude,
            d.longitude,
            "K"
          );
          if (distancevalue <= distance) distancearray.push(d);
        });
        var finaldata = {
          data: distancearray,
          is_error: false,
          message: "Data Send",
        };
        return res.status(200).send(finaldata);
      }
    });
  });
});

module.exports = router;
