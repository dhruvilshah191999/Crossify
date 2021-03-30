var express = require('express');
var auth = require('../middleware/auth');
var mongoose = require('mongoose');
var category_details = require('../modules/interest_category');
var event_details = require('../modules/event_details');
var user_details = require('../modules/user_details');
var club_details = require('../modules/club_details');
var member_details = require('../modules/members_details');
var file_details = require('../modules/file_details');
const {ObjectID, ObjectId} = require('bson');
var router = express.Router();

router.post('/AddPhoto', auth, async function (req, res, next) {
  var {description, photo, name, size, club_id} = req.body;
  var BytestoKB = size * 0.000977;
  var object = {
    name,
    link: photo,
    size: BytestoKB,
    date: new Date(),
    description,
    addedBy: ObjectId(req.user._id),
  };

  var check = file_details.findOne({club_id: ObjectId(club_id), is_active: 1});
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else if (data) {
      file_details
        .updateOne(
          {
            club_id: ObjectId(club_id),
            is_active: 1,
          },
          {
            $push: {photo: object},
          }
        )
        .exec();
      var finaldata = {
        is_error: false,
        message: 'Data Added',
      };
      return res.status(200).send(finaldata);
    } else {
      var array = [];
      array.push(object);
      var added = new file_details({
        club_id: ObjectId(club_id),
        photo: array,
      });
      added.save();
      var finaldata = {
        is_error: false,
        message: 'Data Added',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post('/GetPhotos', async function (req, res, next) {
  var {club_id} = req.body;
  var check = file_details.findOne({club_id: ObjectId(club_id), is_active: 1});
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else if (data) {
      data.photo.sort(function compare(a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        return dateB - dateA;
      });
      var finaldata = {
        data: data.photo,
        is_error: false,
        message: 'Data Added',
      };
      return res.status(200).send(finaldata);
    }
    else {
      var finaldata = {
        data: [],
        is_error: false,
        message: 'Data Added',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post('/DeletePhoto', async function (req, res, next) {
  var {club_id, link} = req.body;
  var check = file_details.updateOne(
    {
      club_id: ObjectId(club_id),
      is_active: 1,
    },
    {
      $pull: {
        photo: {link: link},
      },
    }
  );
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else if (data) {
      var finaldata = {
        remove: true,
        is_error: false,
        message: 'Data Added',
      };
      return res.status(200).send(finaldata);
    } else {
      var finaldata = {
        remove: false,
        is_error: false,
        message: 'Data Added',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post('/EditPhoto', async function (req, res, next) {
  var { description, photo, name, size, club_id, link } = req.body;
  console.log(req.body);
  var check = file_details.updateMany(
    {
      club_id: ObjectId(club_id),
      is_active:1
    },
    {
      $set: {
        'photo.$[elem].description': description,
        'photo.$[elem].link': photo,
        'photo.$[elem].name': name,
        'photo.$[elem].size': size,
        'photo.$[elem].date':new Date()
      }
    },
    {
      multi: true,
      arrayFilters: [{'elem.link': link}],
    }
  );
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else{
      var finaldata = {
        update:true,
        is_error: false,
        message: 'Data Added',
      };
      return res.status(200).send(finaldata);
    }
  });
});



module.exports = router;
