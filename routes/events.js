var express = require('express');
var auth = require('../middleware/auth');
var mongoose = require('mongoose');
var category_details = require('../modules/interest_category');
var event_details = require('../modules/event_details');
var user_details = require('../modules/user_details');
var club_details = require('../modules/club_details');
var reports_details = require('../modules/reports_details');
const { ObjectID, ObjectId } = require('bson');
var router = express.Router();

function getYs(distancearray) {
  return distancearray.map((d) => d.distance);
}

function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 === lat2 && lon1 === lon2) {
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
    if (unit === 'K') {
      dist = dist * 1.609344;
    }
    if (unit === 'N') {
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
  var today = new Date();
  event_details
    .aggregate([
      {
        $lookup: {
          from: 'club_details',
          localField: 'club_id',
          foreignField: '_id',
          as: 'club_data',
        },
      },
      {
        $match: {
          is_active: true,
          ending_date_registration: { $gt: today },
        },
      },
      {
        $project: {
          photo: 1,
          event_name: 1,
          'club_data.club_name': 1,

          startdate: 1,
          _id: 1,
          club_id: 1,
          description: 1,
          tags: 1,
          location: 1,
          city: 1,
          state: 1,
        },
      },
      {
        $sort: { date: -1 },
      },
      {
        $limit: 4,
      },
    ])
    .exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err,
        };
        return res.status(500).send(error);
      } else {
        data.forEach((e) => {
          e.club_name = e.club_data[0].club_name;
        });
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
  var today = new Date();
  var { latitude, longitude } = req.user;
  if (latitude !== 0 && longitude !== 0) {
    var records = event_details.find({
      is_active: true,
      ending_date_registration: { $gt: today },
    });
    let distancearray = [];
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
        let objectIdArray = distancearray.map((s) => ObjectId(s.id));
        event_details
          .aggregate([
            {
              $lookup: {
                from: 'club_details',
                localField: 'club_id',
                foreignField: '_id',
                as: 'club_data',
              },
            },
            {
              $match: {
                is_active: true,
                _id: {
                  $in: objectIdArray,
                },
              },
            },
            {
              $project: {
                photo: 1,
                event_name: 1,
                'club_data.club_name': 1,

                _id: 1,
                startdate: 1,
                club_id: 1,
                description: 1,
                tags: 1,
                location: 1,
                city: 1,
                state: 1,
              },
            },
          ])
          .exec((err, data2) => {
            if (err) {
              var error = {
                is_error: true,
                message: err,
              };
              return res.status(500).send(error);
            } else {
              data2.forEach((e) => {
                e.club_name = e.club_data[0].club_name;
              });
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
    event_details
      .aggregate([
        {
          $lookup: {
            from: 'club_details',
            localField: 'club_id',
            foreignField: '_id',
            as: 'club_data',
          },
        },
        {
          $match: {
            is_active: true,
            ending_date_registration: { $gt: today },
          },
        },
        {
          $project: {
            photo: 1,
            event_name: 1,
            'club_data.club_name': 1,
            startdate: 1,
            _id: 1,
            club_id: 1,
            description: 1,
            tags: 1,
            location: 1,
            city: 1,
            state: 1,
          },
        },
        {
          $sort: { date: -1 },
        },
        {
          $limit: 4,
        },
      ])
      .exec((err, data) => {
        if (err) {
          var error = {
            is_error: true,
            message: err,
          };
          return res.status(500).send(error);
        } else {
          data.forEach((e) => {
            e.club_name = e.club_data[0].club_name;
          });
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
        let objectIdArray = distancearray.map((s) => ObjectId(s.id));
        var eventsrecords = club_details.find({
          _id: {
            $in: objectIdArray,
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

router.post('/event-details', async function (req, res, next) {
  let { event_id } = req.body;
  event_details
    .aggregate([
      {
        $lookup: {
          from: 'club_details',
          localField: 'club_id',
          foreignField: '_id',
          as: 'club_details',
        },
      },
      {
        $match: {
          _id: mongoose.Types.ObjectId(event_id),
          is_active: true,
        },
      },
    ])
    .exec(async (err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(500).send(error);
      } else {
        var arrayToAppend = [];
        data[0].faq.forEach((el) => {
          if (el.privacy == 'public' && el.status == 'answered') {
            arrayToAppend.push(el);
          }
        });
        data[0].faq = arrayToAppend;
        var finaldata = {
          event_data: data[0],
          is_error: false,
          message: 'Data Send',
        };
        return res.status(200).send(finaldata);
      }
    });
});

router.post('/checklikes', auth, async function (req, res, next) {
  let { event_id } = req.body;
  var checks = event_details.findOne({
    _id: ObjectId(event_id),
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
    } else if (data2) {
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
  var checks = event_details.updateOne(
    {
      _id: ObjectId(event_id),
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
          _id: ObjectId(req.user._id),
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
        } else {
          var finaldata = {
            Like: true,
            is_error: false,
            message: 'Data Send',
          };
          return res.status(200).send(finaldata);
        }
      });
    }
  });
});

router.post('/deletelikes', auth, async function (req, res, next) {
  let { event_id } = req.body;
  var checks = event_details.updateOne(
    {
      _id: ObjectId(event_id),
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
          _id: ObjectId(req.user._id),
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
            message: 'Data Send',
          };
          return res.status(200).send(finaldata);
        }
      });
    }
  });
});

router.post('/participate-event', auth, async function (req, res, next) {
  let { event_id, current_participants } = req.body;
  current_participants += 1;
  var object = {
    user: ObjectId(req.user._id),
    date: new Date(),
    status: 'coming',
  };
  var checks = event_details.updateOne(
    {
      _id: ObjectId(event_id),
      is_active: 1,
    },
    {
      $push: { participants_list: object },
      current_participants: current_participants,
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
          _id: ObjectId(req.user._id),
          is_active: true,
        },
        {
          $push: { events: ObjectId(event_id) },
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
            participated: true,
            is_error: false,
            message: 'Data Send',
          };
          return res.status(200).send(finaldata);
        }
      });
    }
  });
});

router.post('/participate-event2', auth, async function (req, res, next) {
  let { event_id, current_participants } = req.body;
  var object = {
    user: ObjectId(req.user._id),
    date: new Date(),
    status: 'waiting',
  };
  var checks = event_details.updateOne(
    {
      _id: ObjectId(event_id),
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
    } else {
      var check2 = user_details.findOneAndUpdate(
        {
          _id: ObjectId(req.user._id),
          is_active: true,
        },
        {
          $push: { events: ObjectId(event_id) },
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
            participated: true,
            is_error: false,
            message: 'Data Send',
          };
          return res.status(200).send(finaldata);
        }
      });
    }
  });
});

router.post('/undo-participation-event', auth, async function (req, res, next) {
  let { event_id, current_participants } = req.body;
  var check = event_details.findOne({
    _id: ObjectId(event_id),
    participants_list: {
      $elemMatch: { user: ObjectId(req.user._id), status: 'waiting' },
    },
    is_active: 1,
  });
  check.exec(async (err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (data != null) {
      var checks = event_details.updateOne(
        {
          _id: ObjectId(event_id),
          is_active: 1,
        },
        {
          $pull: { participants_list: { user: ObjectId(req.user._id) } },
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
              _id: ObjectId(req.user._id),
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
    } else {
      current_participants -= 1;
      var checks = event_details.updateOne(
        {
          _id: ObjectId(event_id),
          is_active: 1,
        },
        {
          $pull: { participants_list: { user: ObjectId(req.user._id) } },
          current_participants,
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
              _id: ObjectId(req.user._id),
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
  });
});

router.post('/getclub', async function (req, res, next) {
  let { club_id } = req.body;
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

router.post('/checkevent', auth, async function (req, res, next) {
  let { event_id } = req.body;
  var checks = event_details.findOne({
    _id: ObjectId(event_id),
    'participants_list.user': ObjectId(req.user._id),
    is_active: 1,
  });
  await checks.exec((err, data2) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (data2 != null) {
      var waiting = false;
      data2.participants_list.forEach((e) => {
        if (e.user === req.user._id) {
          if (e.status === 'waiting') {
            waiting = true;
          }
        }
      });
      var finaldata = {
        waiting,
        attend: true,
        is_error: false,
        message: 'Data Send',
      };
      return res.status(200).send(finaldata);
    } else {
      var finaldata = {
        waiting: false,
        attend: false,
        is_error: false,
        message: 'Data Send',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post('/get-profiles-of-events', async function (req, res, next) {
  let { event_id } = req.body;
  event_details
    .aggregate([
      {
        $lookup: {
          from: 'user_details',
          localField: 'participants_list.user',
          foreignField: '_id',
          as: 'user_details',
        },
      },
      {
        $match: {
          _id: mongoose.Types.ObjectId(event_id),
          is_active: true,
        },
      },
      {
        $project: {
          'user_details.profile_photo': 1,
          'user_details.fname': 1,
          'user_details.lname': 1,
          'user_details._id': 1,
        },
      },
    ])
    .exec(async (err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(500).send(error);
      } else {
        const profilesList = data[0].user_details.map(
          ({ profile_photo, fname, lname, _id }) => {
            return {
              profile_photo,
              name: fname + ' ' + lname,
              user_id: _id,
            };
          }
        );
        var finaldata = {
          event_data: profilesList,
          is_error: false,
          message: 'Data Send',
        };
        return res.status(200).send(finaldata);
      }
    });
});

router.post('/ask-question', auth, async function (req, res, next) {
  var { event_id, question } = req.body;

  try {
    var user_name = await user_details
      .findById({ _id: ObjectId(req.user._id) })
      .then(function (data) {
        return data.fname + ' ' + data.lname;
      });
  } catch (e) {
    console.log(e);
  }
  var object = {
    question: question,
    askedby: user_name,
    date: new Date(),
    status: 'pending',
    privacy: 'private',
  };
  var update = event_details.updateOne(
    { _id: ObjectId(event_id) },
    {
      $push: { faq: object },
    }
  );
  await update.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else {
      var finaldata = {
        is_error: false,
        message: 'Data Updated',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post('/reports', auth, async function (req, res, next) {
  var { event_id, description } = req.body;
  var object = {
    report: description,
    date: new Date(),
    status: 'pending',
  };
  var check = reports_details.find({
    event_id: ObjectId(event_id),
    user_id: ObjectId(req.user._id),
    is_active: true,
  });
  await check.exec(async (err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (data.length != 0) {
      var add = reports_details.updateOne(
        {
          user_id: ObjectId(req.user._id),
          event_id: ObjectId(event_id),
          is_active: true,
        },
        {
          $push: {
            reports: object,
          },
        }
      );
      await add.exec((err, data2) => {
        if (err) {
          var error = {
            is_error: true,
            message: err.message,
          };
          return res.status(600).send(error);
        } else {
          var finaldata = {
            is_error: false,
            message: 'Data Added',
          };
          return res.status(200).send(finaldata);
        }
      });
    } else {
      var array = [];
      array.push(object);
      var reports = new reports_details({
        event_id: ObjectId(event_id),
        user_id: ObjectId(req.user._id),
        reports: array,
      });
      reports.save();
      var finaldata = {
        is_error: false,
        message: 'Data Added',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.get('/get-interest-data', async function (req, res, next) {
  var today = new Date();
  category_details
    .aggregate([
      {
        $lookup: {
          from: 'event_details',
          localField: '_id',
          foreignField: 'category_list',
          as: 'event_data',
        },
      },
      {
        $match: {
          is_active: true,
        },
      },
      {
        $project: {
          event: { $slice: ['$event_data', 4] },
          category_name: 1,
        },
      },
      {
        $limit: 3,
      },
      {
        $lookup: {
          from: 'club_details',
          localField: 'event.club_id',
          foreignField: '_id',
          as: 'club_data',
        },
      },
      {
        $project: {
          'event.photo': 1,
          'event.event_name': 1,
          'club_data.club_name': 1,
          'club_data._id': 1,
          'event.startdate': 1,
          'event._id': 1,
          'event.club_id': 1,
          'event.description': 1,
          'event.tags': 1,
          'event.location': 1,
          'event.city': 1,
          'event.state': 1,

          'event.is_active': 1,
          'event.ending_date_registration': 1,
          category_name: 1,
        },
      },
    ])
    .exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err,
        };
        return res.status(500).send(error);
      } else {
        var array = [];
        data.forEach((d) => {
          var eventarray = [];
          d.event.forEach((e) => {
            if (e.is_active && e.ending_date_registration >= today) {
              var result = d.club_data.filter((obj) => {
                return obj._id.equals(ObjectId(e.club_id));
              });
              e.club_name = result[0].club_name;
              eventarray.push(e);
            }
          });
          var object = {
            category_name: d.category_name,
            event: eventarray,
          };
          array.push(object);
        });
        var finaldata = {
          data: array,
          is_error: false,
          message: 'Data Geted',
        };
        return res.status(200).send(finaldata);
      }
    });
});

router.post('/user-interest-data', auth, async function (req, res, next) {
  var today = new Date();
  var data = await user_details
    .findOne({ _id: ObjectId(req.user._id), is_active: true })
    .exec();
  if (data.interest_id.length !== 0) {
    category_details
      .aggregate([
        {
          $lookup: {
            from: 'event_details',
            localField: '_id',
            foreignField: 'category_list',
            as: 'event_data',
          },
        },
        {
          $match: {
            is_active: true,
            _id: { $in: data.interest_id },
          },
        },
        {
          $project: {
            event: { $slice: ['$event_data', 4] },
            category_name: 1,
          },
        },
        {
          $limit: 4,
        },
        {
          $lookup: {
            from: 'club_details',
            localField: 'event.club_id',
            foreignField: '_id',
            as: 'club_data',
          },
        },
        {
          $project: {
            'event.photo': 1,
            'event.event_name': 1,
            'club_data.club_name': 1,
            'club_data._id': 1,
            'event.startdate': 1,
            'event._id': 1,
            'event.club_id': 1,
            'event.description': 1,
            'event.tags': 1,
            'event.location': 1,
            'event.city': 1,
            'event.state': 1,
            'event.is_active': 1,
            'event.ending_date_registration': 1,
            category_name: 1,
          },
        },
      ])
      .exec((err, data) => {
        if (err) {
          var error = {
            is_error: true,
            message: err,
          };
          return res.status(500).send(error);
        } else {
          var array = [];
          data.forEach((d) => {
            var eventarray = [];
            d.event.forEach((e) => {
              if (e.is_active && e.ending_date_registration >= today) {
                var result = d.club_data.filter((obj) => {
                  return obj._id.equals(ObjectId(e.club_id));
                });
                e.club_name = result[0].club_name;
                eventarray.push(e);
              }
            });
            var object = {
              category_name: d.category_name,
              event: eventarray,
            };
            array.push(object);
          });
          var finaldata = {
            data: array,
            is_error: false,
            message: 'Data Geted',
          };
          return res.status(200).send(finaldata);
        }
      });
  } else {
    category_details
      .aggregate([
        {
          $lookup: {
            from: 'event_details',
            localField: '_id',
            foreignField: 'category_list',
            as: 'event_data',
          },
        },
        {
          $match: {
            is_active: true,
          },
        },
        {
          $project: {
            event: { $slice: ['$event_data', 4] },
            category_name: 1,
          },
        },
        {
          $limit: 3,
        },
        {
          $lookup: {
            from: 'club_details',
            localField: 'event.club_id',
            foreignField: '_id',
            as: 'club_data',
          },
        },
        {
          $project: {
            'event.photo': 1,
            'event.event_name': 1,
            'club_data.club_name': 1,
            'club_data._id': 1,
            'event.date': 1,
            'event._id': 1,
            'event.club_id': 1,
            'event.description': 1,
            'event.tags': 1,
            'event.location': 1,
            'event.city': 1,
            'event.state': 1,
            'event.is_active': 1,
            category_name: 1,
          },
        },
      ])
      .exec((err, data) => {
        if (err) {
          var error = {
            is_error: true,
            message: err,
          };
          return res.status(500).send(error);
        } else {
          var array = [];
          data.forEach((d) => {
            var eventarray = [];
            d.event.forEach((e) => {
              if (e.is_active) {
                var result = d.club_data.filter((obj) => {
                  return obj._id.equals(ObjectId(e.club_id));
                });
                e.club_name = result[0].club_name;
                eventarray.push(e);
              }
            });
            var object = {
              category_name: d.category_name,
              event: eventarray,
            };
            array.push(object);
          });
          var finaldata = {
            data: array,
            is_error: false,
            message: 'Data Geted',
          };
          return res.status(200).send(finaldata);
        }
      });
  }
});

router.post('/deleteevent', async function (req, res, next) {
  let { event_id } = req.body;
  var checks = event_details.deleteOne({
    _id: ObjectId(event_id),
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
        is_error: false,
        message: 'Data Send',
      };
      return res.status(200).send(finaldata);
    }
  });
});
router.post('/getEventName', async function (req, res, next) {
  var { id } = req.body;
  try {
    var event = await event_details.findOne({
      _id: ObjectId(id),
    });
    if (event) {
      var finaldata = {
        is_error: false,
        eventName: event.event_name,
      };
      return res.status(200).send(finaldata);
    }
  } catch (err) {
    var error = {
      is_error: true,
      message: err.message,
    };
    return res.status(600).send(error);
  }
});
module.exports = router;
