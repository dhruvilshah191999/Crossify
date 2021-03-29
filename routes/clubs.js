var express = require('express');
var auth = require('../middleware/auth');
var mongoose = require('mongoose');
var category_details = require('../modules/interest_category');
var event_details = require('../modules/event_details');
var user_details = require('../modules/user_details');
var club_details = require('../modules/club_details');
var member_details = require('../modules/members_details');
const {ObjectID, ObjectId} = require('bson');
var router = express.Router();

router.post('/create-club', auth, async (req, res) => {
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
    tags,
    question,
  } = req.body;
  var array = [];
  category.map((e) => {
    array.push(ObjectId(e._id));
  });

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
    status: privacy,
    question,
  });
  club.save().then((data) => {
    var finaldata = {
      is_error: false,
      message: 'Data Added',
    };
    return res.status(200).send(finaldata);
  });
});

router.post('/get-club', auth, async (req, res) => {
  const {club_id} = req.body;
  club_details
    .aggregate([
      {
        $lookup: {
          from: 'user_details',
          localField: 'creator_id',
          foreignField: '_id',
          as: 'user_data',
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
          city: 1,
          state: 1,
          date: 1,
          tags: 1,
          club_name: 1,
          profile_photo: 1,
          status: 1,
          creator_id: 1,
          'user_data.fname': 1,
          'user_data.lname': 1,
          _id: 1,
          description: 1,
          joining_criteria: 1,
          rules: 1,
          question: 1,
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
        var isAdmin = false;
        if (data[0].creator_id == req.user._id) {
          isAdmin = true;
        }
        var finaldata = {
          data: data,
          isAdmin,
          is_error: false,
          message: 'Data Send',
        };
        return res.status(200).send(finaldata);
      }
    });
});

router.post('/create-event', auth, async (req, res) => {
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
  var startdate = new Date(starting_date + ' ' + starting_time);
  var date = new Date(ending_date + ' ' + ending_time);

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
    maximum_participants: capacity,
  });
  event.save().then((data) => {
    var finaldata = {
      is_error: false,
      message: 'Data Added',
    };
    return res.status(200).send(finaldata);
  });
});

router.post('/addlikes', auth, async function (req, res, next) {
  let {club_id} = req.body;
  var checks = club_details.update(
    {
      _id: ObjectId(club_id),
      is_active: 1,
    },
    {
      $push: {likes: ObjectId(req.user._id)},
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
          $push: {fav_club: ObjectId(club_id)},
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

router.post('/removelikes', auth, async function (req, res, next) {
  let {club_id} = req.body;
  var checks = club_details.update(
    {
      _id: ObjectId(club_id),
      is_active: 1,
    },
    {
      $pull: {likes: ObjectId(req.user._id)},
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
          $pull: {fav_club: ObjectId(club_id)},
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

router.post('/checklikes', auth, async function (req, res, next) {
  let {club_id} = req.body;
  var checks = club_details.find({
    _id: ObjectId(club_id),
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

router.post('/AddClubMember', auth, async function (req, res, next) {
  var {club_id} = req.body;
  var object = {
    user: ObjectId(req.user._id),
    level: 'member',
    date: new Date(),
  };
  var result = member_details.findOne({
    club_id: ObjectId(club_id),
    is_active: true,
  });
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (data == null) {
      var array = [];
      array.push(object);
      var Members = new member_details({
        club_id: ObjectId(club_id),
        is_active: true,
        member_list: array,
      });
      Members.save().then((data) => {
        user_details
          .updateOne(
            {_id: ObjectId(req.user._id)},
            {$push: {clubs: ObjectId(club_id)}}
          )
          .exec((err, data2) => {
            var finaldata = {
              participated: true,
              is_error: false,
              message: 'Data Send',
            };
            return res.status(200).send(finaldata);
          });
      });
    } else {
      var Members = member_details.update(
        {
          club_id: ObjectId(club_id),
          is_active: true,
        },
        {
          $push: {member_list: object},
        }
      );
      Members.exec((err, data) => {
        user_details
          .updateOne(
            {_id: ObjectId(req.user._id)},
            {$push: {clubs: ObjectId(club_id)}}
          )
          .exec((err, data2) => {
            var finaldata = {
              participated: true,
              is_error: false,
              message: 'Data Send',
            };
            return res.status(200).send(finaldata);
          });
      });
    }
  });
});

router.post('/RemoveClubMember', auth, async function (req, res, next) {
  var {club_id} = req.body;

  var result = member_details.findOneAndUpdate(
    {club_id: ObjectId(club_id)},
    {$pull: {member_list: {user: ObjectId(req.user._id)}}}
  );

  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else {
      user_details
        .findOneAndUpdate(
          {_id: ObjectId(req.user._id)},
          {$pull: {clubs: ObjectId(club_id)}}
        )
        .exec();
      var finaldata = {
        participated: false,
        is_error: false,
        message: 'Data Send',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post('/IsMemberExist', auth, async function (req, res, next) {
  var {club_id} = req.body;
  var result = member_details.findOne({
    club_id: ObjectId(club_id),
    'member_list.user': ObjectId(req.user._id),
    is_active: 1,
  });
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else {
      if (data) {
        var finaldata = {
          join: true,
          is_error: false,
        };
        return res.status(200).send(finaldata);
      } else {
        var finaldata = {
          join: false,
          is_error: false,
        };
        return res.status(200).send(finaldata);
      }
    }
  });
});

router.post('/AddRequestMember', auth, async function (req, res, next) {
  var {club_id, isReply} = req.body;
  var object = {
    club: ObjectId(club_id),
    reply: isReply,
  };
  var result = user_details.update(
    {
      _id: ObjectId(req.user._id),
      is_active: 1,
    },
    {
      $push: {club_answer: object},
    }
  );
  await result.exec((err, data) => {
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

router.post('/IsMemberRequestExist', auth, async function (req, res, next) {
  var {club_id} = req.body;
  var result = user_details.findOne({
    _id: ObjectId(req.user._id),
    'club_answer.club': ObjectId(club_id),
    is_active: 1,
  });
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else {
      if (data) {
        var finaldata = {
          request: true,
          is_error: false,
        };
        return res.status(200).send(finaldata);
      } else {
        var finaldata = {
          request: false,
          is_error: false,
        };
        return res.status(200).send(finaldata);
      }
    }
  });
});

router.post('/RemoveRequest', auth, async function (req, res, next) {
  var {club_id} = req.body;
  var result = user_details.findOneAndUpdate(
    {_id: ObjectId(req.user._id)},
    {$pull: {club_answer: {club: ObjectId(club_id)}}}
  );
  await result.exec((err, data) => {
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
});

router.post('/GetMembers', async function (req, res, next) {
  var { club_id } = req.body;
  member_details
    .aggregate([
      {
        $lookup: {
          from: 'user_details',
          localField: 'member_list.user',
          foreignField: '_id',
          as: 'user_data',
        },
      },
      {
        $match: {
          club_id: ObjectId(club_id),
          is_active: true,
        },
      },
      {
        $project: {
          'user_data.fname': 1,
          'user_data.lname': 1,
          'user_data.profile_photo': 1,
          'user_data._id': 1,
          member_list: 1,
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
        let members = [];
        let moderator = [];
        data[0].member_list.map((e) => {
          if (e.level == 'member') {
            var result = data[0].user_data.filter((obj) => {
               return obj._id.equals(ObjectId(e.user))
            });
            var object = {
              name: result[0].fname + ' ' + result[0].lname,
              image: result[0].profile_photo,
              designation: e.level,
            };
            members.push(object);
          } else {
            var result = data[0].user_data.filter((obj) => {
              return obj._id.equals(ObjectId(e.user));
            });
            var object = {
              name: result[0].fname + ' ' + result[0].lname,
              image: result[0].profile_photo,
              designation: e.level,
            };
            moderator.push(object);
          }
        });
        var final = [...members, ...moderator];
        var finaldata = {
          data: final,
          members,
          moderator,
          is_error: false,
          message: 'Data Send',
        };
        return res.status(200).send(finaldata);
      }
    });
});
module.exports = router;
