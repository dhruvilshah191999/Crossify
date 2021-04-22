var express = require('express');
var auth = require('../middleware/auth');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var moment = require('moment');
var event_details = require('../modules/event_details');
var user_details = require('../modules/user_details');
var club_details = require('../modules/club_details');
var reports_details = require('../modules/reports_details');
const { ObjectId } = require('bson');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

var adminPass = process.env.PASSWORD;
var adminMail = process.env.MAIL;

var handlebars = require('handlebars');
var fs = require('fs');
var router = express.Router();

router.post('/general-update', async function (req, res, next) {
  var {
    event_id,
    event_name,
    visibility,
    maximum_participants,
    pincode,
    address,
    city,
    state,
    latitude,
    longitude,
    starting_date,
    starting_time,
    ending_date,
    ending_time,
  } = req.body;
  var startdate = new Date(starting_date + ' ' + starting_time);
  var date = new Date(ending_date + ' ' + ending_time);
  var check = event_details.updateOne(
    {
      _id: ObjectId(event_id),
    },
    {
      event_name: event_name,
      visibility,
      location: address,
      city,
      pincode,
      state,
      maximum_participants,
      longitude,
      latitude,
      startdate,
      date,
    }
  );
  await check.exec((error, data) => {
    if (error) {
      var error = {
        is_error: true,
        message: error.message,
      };
      return res.status(400).send(error);
    } else if (data === null || data.length === 0) {
      var error = {
        is_error: true,
        message: 'wrong event id or you may not have access to update ',
      };
      return res.status(404).send(error);
    } else {
      var finaldata = {
        update: true,
        is_error: false,
        message: 'value updated succesfully',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post('/details-update', async function (req, res, next) {
  var { event_id, photo, description, eligibility, tags } = req.body;
  var check;
  if (photo != null) {
    check = event_details.updateOne(
      {
        _id: ObjectId(event_id),
      },
      {
        photo,
        description,
        eligibility,
        tags,
      }
    );
  } else {
    check = event_details.update(
      {
        _id: ObjectId(event_id),
        is_active: 1,
      },
      {
        description,
        eligibility,
        tags,
      }
    );
  }
  await check.exec((error, data) => {
    if (error) {
      var error = {
        is_error: true,
        message: error.message,
      };
      return res.status(400).send(error);
    } else if (data === null || data.length === 0) {
      var error = {
        update: false,
        is_error: true,
        message: 'wrong event id or you may not have access to update ',
      };
      return res.status(404).send(error);
    } else {
      var finaldata = {
        update: true,
        is_error: false,
        message: 'value updated succesfully',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post('/Status_Update', async function (req, res, next) {
  var { event_id, user_id, status } = req.body;

  var check = event_details.findOneAndUpdate(
    {
      _id: ObjectId(event_id),
      participants_list: { $in: { user: ObjectId(user_id) } },
    },
    {
      $set: { 'participants_list.$.status': status },
    }
  );

  await check.exec((err, data) => {
    if (err) {
      var err = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(err);
    } else if (data) {
      var finaldata = {
        is_error: false,
        message: 'value updated succesfully',
      };
      return res.status(200).send(finaldata);
    } else {
      var err = {
        is_error: true,
        message: 'wrong event id or you may not have access to update ',
      };
      return res.status(404).send(err);
    }
  });
});

router.post('/get-faq', async function (req, res, next) {
  var { event_id } = req.body;
  var result = event_details.findOne({
    _id: ObjectId(event_id),
  });
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (result === null) {
      var error = {
        is_error: true,
        message: 'User Not Found',
      };
      return res.status(600).send(error);
    } else {
      var final = [];
      data.faq.forEach((e) => {
        var object = {
          que: e.question,
          ownerName: e.askedby,
          date: moment(e.date).format('DD MMM YYYY'),
          status: e.status,
          privacy: e.privacy,
          id: e._id,
        };
        final.push(object);
      });
      var finaldata = {
        data: final,
        is_error: false,
        message: 'Data Send',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post('/publish', async function (req, res, next) {
  var { event_id, questions } = req.body;
  var check = event_details.updateMany(
    {
      _id: ObjectId(event_id),
    },
    { $set: { 'faq.$[elem].privacy': 'public' } },
    {
      multi: true,
      arrayFilters: [{ 'elem.question': { $in: questions } }],
    }
  );
  await check.exec((error, data) => {
    if (error) {
      var err = {
        is_error: true,
        message: error.message,
      };
      return res.status(500).send(err);
    } else if (data === null || data.length === 0) {
      var err = {
        is_error: true,
        message: 'wrong event details',
      };
      return res.status(404).send(err);
    } else {
      var finaldata = {
        update: true,
        is_error: false,
        message: 'value has been updated',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post('/privatise', async function (req, res, next) {
  var { event_id, questions } = req.body;
  var check = event_details.updateMany(
    {
      _id: ObjectId(event_id),
    },
    { $set: { 'faq.$[elem].privacy': 'private' } },
    {
      multi: true,
      arrayFilters: [{ 'elem.question': { $in: questions } }],
    }
  );
  await check.exec((error, data) => {
    if (error) {
      var err = {
        is_error: true,
        message: error.message,
      };
      return res.status(500).send(err);
    } else if (data === null || data.length === 0) {
      var err = {
        is_error: true,
        message: 'wrong event details',
      };
      return res.status(404).send(err);
    } else {
      var finaldata = {
        update: true,
        is_error: false,
        message: 'value has been updated',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post('/reject', async function (req, res, next) {
  var { event_id, questions } = req.body;
  var check = event_details.updateMany(
    {
      _id: ObjectId(event_id),
    },
    { $set: { 'faq.$[elem].status': 'rejected' } },
    {
      multi: true,
      arrayFilters: [{ 'elem.question': { $in: questions } }],
    }
  );
  await check.exec((error, data) => {
    if (error) {
      var err = {
        is_error: true,
        message: error.message,
      };
      return res.status(500).send(err);
    } else if (data === null || data.length === 0) {
      var err = {
        is_error: true,
        message: 'wrong event details',
      };
      return res.status(404).send(err);
    } else {
      var finaldata = {
        update: true,
        is_error: false,
        message: 'value has been updated',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post('/answer', async function (req, res, next) {
  var { event_id, question, answer } = req.body;
  var check = event_details.updateOne(
    { _id: ObjectId(event_id) },
    {
      $set: { 'faq.$[elem].status': 'answered', 'faq.$[elem].answer': answer },
    },
    {
      multi: false,
      arrayFilters: [{ 'elem.question': question }],
    }
  );
  await check.exec((err, data) => {
    if (err) {
      var err = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(err);
    } else if (data) {
      var finaldata = {
        is_error: false,
        message: 'value updated succesfully',
      };
      return res.status(200).send(finaldata);
    } else {
      var err = {
        is_error: true,
        message: 'wrong event id or you may not have access to update ',
      };
      return res.status(404).send(err);
    }
  });
});

router.post('/get-list', async function (req, res, next) {
  var { event_id } = req.body;
  var result = event_details.findOne({
    _id: ObjectId(event_id),
  });
  await result.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (result === null) {
      var error = {
        is_error: true,
        message: 'User Not Found',
      };
      return res.status(600).send(error);
    } else {
      var final = [];
      async function resultdata() {
        data.participants_list.forEach(async (e) => {
          var getdata = user_details.findOne(
            { _id: ObjectId(e.user), is_active: 1 },
            { email: 1, fname: 1, lname: 1, city: 1, profile_photo: 1 }
          );
          await getdata.exec((err2, data2) => {
            if (data2) {
              var object = {
                id: data2._id,
                photo: data2.profile_photo,
                name: data2.fname + ' ' + data2.lname,
                date: e.date,
                location: data.city,
                status: e.status,
              };
              final.push(object);
            }
          });
        });
        let promise = new Promise((resolve, reject) => {
          setTimeout(() => resolve('done!'), 1000);
        });
        let result = await promise;
      }
      resultdata().then((err) => {
        var finaldata = {
          data: final,
          is_error: false,
          message: 'Data Send',
        };
        return res.status(200).send(finaldata);
      });
    }
  });
});

router.post('/arrived', async function (req, res, next) {
  var { event_id, userIds } = req.body;
  userIds = userIds.map((s) => mongoose.Types.ObjectId(s));
  var check = event_details.updateMany(
    {
      _id: ObjectId(event_id),
    },
    { $set: { 'participants_list.$[elem].status': 'arrived' } },
    {
      multi: true,
      arrayFilters: [{ 'elem.user': { $in: userIds } }],
    }
  );
  await check.exec((error, data) => {
    if (error) {
      var err = {
        is_error: true,
        message: error.message,
      };
      return res.status(500).send(err);
    } else if (data === null || data.length === 0) {
      var err = {
        is_error: true,
        message: 'wrong event details',
      };
      return res.status(404).send(err);
    } else {
      var finaldata = {
        update: true,
        is_error: false,
        message: 'value has been updated',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post('/userarrived', async function (req, res, next) {
  var { event_id, user_id } = req.body;

  var check = event_details.updateOne(
    { _id: ObjectId(event_id), 'participants_list.user': ObjectId(user_id) },
    { $set: { 'participants_list.$.status': 'coming' } }
  );

  await check.exec((err, data) => {
    if (err) {
      var err = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(err);
    } else if (data) {
      var finaldata = {
        is_error: false,
        message: 'value updated succesfully',
      };
      return res.status(200).send(finaldata);
    } else {
      var err = {
        is_error: true,
        message: 'wrong event id or you may not have access to update ',
      };
      return res.status(404).send(err);
    }
  });
});

router.post('/Cancelled', async function (req, res, next) {
  var { event_id, user_id } = req.body;
  var check = event_details.updateOne(
    { _id: ObjectId(event_id), 'participants_list.user': ObjectId(user_id) },
    { $set: { 'participants_list.$.status': 'Cancelled' } }
  );

  await check.exec((err, data) => {
    if (err) {
      var err = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(err);
    } else if (data) {
      var finaldata = {
        is_error: false,
        message: 'value updated succesfully',
      };
      return res.status(200).send(finaldata);
    } else {
      var err = {
        is_error: true,
        message: 'wrong event id or you may not have access to update ',
      };
      return res.status(404).send(err);
    }
  });
});

router.post('/get-all-reports', auth, async function (req, res, next) {
  const { event_id } = req.body;
  reports_details
    .aggregate([
      {
        $lookup: {
          from: 'user_details',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user_data',
        },
      },
      {
        $match: {
          event_id: ObjectId(event_id),
          is_active: true,
        },
      },
      {
        $project: {
          event_id: 1,
          _id: 1,
          user_id: 1,
          reports: 1,
          'user_data.profile_photo': 1,
          'user_data.fname': 1,
          'user_data.lname': 1,
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
      } else if (data.length != 0) {
        var array = [];
        data.forEach((e) => {
          var object = {
            event_id: e.event_id,
            user_id: e.user_id,
            description: e.reports[e.reports.length - 1].report,
            date: e.reports[e.reports.length - 1].date,
            reports: e.reports,
            status: e.reports[e.reports.length - 1].status,
            id: e._id,
            name: e.user_data[0].fname + ' ' + e.user_data[0].lname,
            record: e,
          };
          array.push(object);
        });
        var finaldata = {
          data: array,
          is_error: false,
          message: 'Data Send',
        };
        return res.status(200).send(finaldata);
      } else {
        var finaldata = {
          data: [],
          is_error: false,
          message: 'Data Send',
        };
        return res.status(200).send(finaldata);
      }
    });
});

router.post('/remove-reports', async function (req, res, next) {
  const { report_id } = req.body;
  var update = reports_details.updateOne(
    {
      _id: ObjectId(report_id),
    },
    {
      is_active: false,
    }
  );
  await update.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } else if (data) {
      var finaldata = {
        update: true,
        is_error: false,
        message: 'Data Send',
      };
      return res.status(200).send(finaldata);
    } else {
      var finaldata = {
        is_error: true,
        message: 'Data Send',
      };
      return res.status(404).send(finaldata);
    }
  });
});

router.post('/rejected-reports', auth, async function (req, res, next) {
  const { report_id, user_id } = req.body;
  var getdata = user_details.findOne({ _id: ObjectId(req.user._id) });
  getdata.exec(async (err, final) => {
    var object = {
      date: new Date(),
      title: 'Your Reports is rejected by ' + final.fname,
      description: '',
      sender_id: ObjectId(req.user._id),
      photo: final.profile_photo,
      isRead: false,
    };
    var update = user_details.updateOne(
      {
        _id: ObjectId(user_id),
      },
      { $push: { inbox: object } }
    );
    await update.exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(500).send(error);
      } else if (data === null || data.length === 0) {
        var finaldata = {
          is_error: true,
          message: 'Data Send',
        };
        return res.status(404).send(finaldata);
      } else {
        var updatereports = reports_details
          .updateMany(
            {
              _id: ObjectId(report_id),
            },
            { $set: { 'reports.$[].status': 'rejected' } }
          )
          .exec();
        var finaldata = {
          is_error: false,
          message: 'Data Send',
        };
        return res.status(200).send(finaldata);
      }
    });
  });
  // var update = reports_details.updateMany(
  //   {
  //     _id: ObjectId(report_id),
  //   },
  //   { $set: { "reports.$[].status": "rejected" } }
  // );
  // await update.exec((err, data) => {
  //   if (err) {
  //     var error = {
  //       is_error: true,
  //       message: err.message,
  //     };
  //     return res.status(500).send(error);
  //   } else if (data === null || data.length === 0) {
  //     var finaldata = {
  //       is_error: true,
  //       message: "Data Send",
  //     };
  //     return res.status(404).send(finaldata);
  //   } else {
  //     var finaldata = {
  //       is_error: false,
  //       message: "Data Send",
  //     };
  //     return res.status(200).send(finaldata);
  //   }
  // });
});

router.post('/send-reports', auth, async function (req, res, next) {
  const { report_id, answer, user_id } = req.body;
  var getdata = user_details.findOne({ _id: ObjectId(req.user._id) });
  getdata.exec(async (err, final) => {
    var object = {
      date: new Date(),
      title: 'Your Reports is answered by ' + final.fname,
      description: answer,
      sender_id: ObjectId(req.user._id),
      photo: final.profile_photo,
      isRead: false,
    };
    var update = user_details.updateOne(
      {
        _id: ObjectId(user_id),
      },
      { $push: { inbox: object } }
    );
    await update.exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(500).send(error);
      } else if (data === null || data.length === 0) {
        var finaldata = {
          is_error: true,
          message: 'Data Send',
        };
        return res.status(404).send(finaldata);
      } else {
        var updatereports = reports_details
          .updateMany(
            {
              _id: ObjectId(report_id),
            },
            { $set: { 'reports.$[].status': 'replied' } }
          )
          .exec();
        var finaldata = {
          is_error: false,
          message: 'Data Send',
        };
        return res.status(200).send(finaldata);
      }
    });
  });
});

router.post('/check-club', auth, async function (req, res, next) {
  var { club_id } = req.body;
  if (club_id.length != 24) {
    var error = {
      check: false,
      is_error: true,
      message: 'User Not Found',
    };
    return res.status(200).send(error);
  } else {
    var result = club_details.findOne({
      _id: ObjectId(club_id),
      creator_id: ObjectId(req.user._id),
      is_active: 1,
    });
    await result.exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(600).send(error);
      } else if (!data) {
        var error = {
          check: false,
          is_error: true,
          message: 'User Not Found',
        };
        return res.status(200).send(error);
      } else {
        var finaldata = {
          check: true,
          is_error: false,
          message: 'Data Send',
        };
        return res.status(200).send(finaldata);
      }
    });
  }
});

router.post('/Broadcast', async function (req, res, next) {
  console.log(adminPass);
  var { userIds, event_id, message, path } = req.body;
  let objectIdArray = userIds.map((s) => mongoose.Types.ObjectId(s));
  var check = await user_details.find({
    _id: { $in: objectIdArray },
    is_active: 1,
  });
  var event = await event_details
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
        $lookup: {
          from: 'user_details',
          localField: 'oragnizer_id',
          foreignField: '_id',
          as: 'user_data',
        },
      },
      {
        $match: {
          _id: ObjectId(event_id),
          is_active: true,
        },
      },
      {
        $project: {
          _id: 1,
          event_name: 1,
          photo: 1,
          startdate: 1,
          'club_data.club_name': 1,
          'club_data._id': 1,
          'club_data.profile_photo': 1,
          'user_data.fname': 1,
          'user_data.lname': 1,
          'user_data._id': 1,
          'user_data.profile_photo': 1,
        },
      },
    ])
    .exec();
  var finaldata = {
    is_error: false,
    message: 'value updated succesfully',
  };

  var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
      if (err) {
        throw err;
        callback(err);
      } else {
        callback(null, html);
      }
    });
  };

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    name: 'SAGAR18-11',
    host: 'smtp.gmail.com',
    port: 465, //587
    secure: true, //for true 465,
    auth: {
      user: adminMail,
      pass: adminPass,
    },
  });

  readHTMLFile('views/BroadcastMessage.html', function (err, html) {
    var template = handlebars.compile(html);
    for (let index = 0; index < check.length; index++) {
      var replacements = {
        fname: check[index].fname,
        lname: check[index].lname,
        message: message,
        event_name: event[0].event_name,
        owner_name:
          event[0].user_data[0].fname + ' ' + event[0].user_data[0].lname,
        owner_photo: event[0].user_data[0].profile_photo,
        club_name: event[0].club_data[0].club_name,
        club_photo: event[0].club_data[0].profile_photo,
        start_date: moment(event[0].startdate).format('MMMM Do, YYYY'),
        time: moment(event[0].startdate).format('LT'),
        profile: path + '/profilepage/' + event[0].user_data[0]._id,
        club: path + '/club/' + event[0].club_data[0]._id,
        event: path + '/events/event=' + event_id,
        finaldate: moment(event[0].startdate).format('MMMM Do, YYYY | h:mm a'),
      };
      console.log(check[index]);
      var htmlToSend = template(replacements);
      const mailOptions = {
        from: 'crossify.vgec@gmail.com',
        to: check[index].email,
        subject: `Notice From ${event[0].event_name}`,
        html: htmlToSend,
      };
      transporter.sendMail(mailOptions, function (error) {
        if (error) {
          console.log(error);
          callback(error);
        }
      });
    }
  });
  return res.status(200).send(finaldata);
});

router.post('/WelcomeMail', async function (req, res, next) {
  var { email, interest_array, url } = req.body;

  let objectIdArray = interest_array.map((s) => mongoose.Types.ObjectId(s));
  var x = ObjectId();
  var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
      if (err) {
        throw err;
        callback(err);
      } else {
        callback(null, html);
      }
    });
  };

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    name: 'SAGAR18-11',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, //for true 465,
    auth: {
      user: adminMail,
      pass: adminPass,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  readHTMLFile('views/WelcomeMail.html', function (err, html) {
    var template = handlebars.compile(html);
    var replacements = {
      verify_link: url + '/auth/verify/' + x,
      home: url,
      club: url + '/clubsearch',
      name: data.fname + ' ' + data.lname,
    };
    var htmlToSend = template(replacements);
    const mailOptions = {
      from: 'crossify.vgec@gmail.com',
      to: data.email,
      subject: 'Welcome To Crossify',
      html: htmlToSend,
    };
    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        console.log(error);
        callback(error);
      }
    });
  });
  data.password = bcrypt.hashSync(data.password, 10);
  var user = new user_details({
    email: data.email,
    fname: data.fname,
    lname: data.lname,
    password: data.password,
    profile_photo: data.photo,
    interest_id: objectIdArray,
    username: data.username,
    address: data.address,
    birth_date: data.dob,
    city: data.city,
    state: data.state,
    about_me: data.about_me,
    occupation: data.occupation,
    generate_code: ObjectId(x),
    latitude: data.latitude,
    longitude: data.longitude,
    pincode: data.pincode,
    is_verified: true,
  });
  user.save((err, ans) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
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

router.post('/ForgotMail', async function (req, res, next) {
  var { email, url } = req.body;
  var check = user_details.findOne({ email: email, is_active: true });
  await check.exec((err, data) => {
    if (err) {
      var err = {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(err);
    } else if (data) {
      var x = ObjectId();
      var readHTMLFile = function (path, callback) {
        fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
          if (err) {
            throw err;
            callback(err);
          } else {
            callback(null, html);
          }
        });
      };

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        name: 'SAGAR18-11',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: adminMail,
          pass: adminPass,
        },
      });
      readHTMLFile('views/ForgotPasswordMail.html', function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
          fname: data.fname,
          lname: data.lname,
          forgot_password_link: url + '/auth/setpassword/' + x,
          signup: url + '/auth/register',
          home: url,
          my_account: url + '/profile/edit/myprofile',
        };
        var htmlToSend = template(replacements);
        const mailOptions = {
          from: 'crossify.vgec@gmail.com',
          to: email,
          subject: 'Forgot Password',
          html: htmlToSend,
        };
        transporter.sendMail(mailOptions, function (error) {
          if (error) {
            console.log(error);
            callback(error);
          }
        });
      });
      user_details
        .updateOne(
          { email: email, is_active: true },
          { generate_code: ObjectId(x) }
        )
        .exec();
      var finaldata = {
        is_error: false,
        message: 'value updated succesfully',
      };
      return res.status(200).send(finaldata);
    } else {
      var err = {
        is_error: true,
        message: 'wrong event id or you may not have access to update ',
      };
      return res.status(404).send(err);
    }
  });
});

router.post('/UserNameCheck', async function (req, res, next) {
  var { username } = req.body;
  var check = user_details.findOne({ username: username, is_active: true });
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (!data) {
      var error = {
        check: true,
        is_error: true,
        message: 'not found',
      };
      return res.status(200).send(error);
    } else {
      var finaldata = {
        check: true,
        is_error: false,
        message: 'data send',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post('/EmailCheck', async function (req, res, next) {
  var { email } = req.body;
  var check = user_details.findOne({ email: email, is_active: true });
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(600).send(error);
    } else if (!data) {
      var error = {
        check: true,
        is_error: true,
        message: 'not found',
      };
      return res.status(200).send(error);
    } else {
      var finaldata = {
        check: true,
        is_error: false,
        message: 'data send',
      };
      return res.status(200).send(finaldata);
    }
  });
});

router.post('/check-code', async function (req, res, next) {
  var { generate } = req.body;
  if (generate.length != 24) {
    var error = {
      check: false,
      is_error: true,
      message: 'User Not Found',
    };
    return res.status(200).send(error);
  } else {
    var result = user_details.findOne({
      generate_code: ObjectId(generate),
    });
    await result.exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(600).send(error);
      } else if (!data) {
        var error = {
          check: false,
          is_error: true,
          message: 'User Not Found',
        };
        return res.status(200).send(error);
      } else {
        var finaldata = {
          check: true,
          is_error: false,
          message: 'Data Send',
        };
        return res.status(200).send(finaldata);
      }
    });
  }
});

router.post('/reset_password', async function (req, res, next) {
  var { generate, password } = req.body;
  password = bcrypt.hashSync(password, 10);
  var result = user_details.updateOne(
    {
      generate_code: ObjectId(generate),
    },
    {
      password,
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

router.post('/update-code', async function (req, res, next) {
  var { generate } = req.body;
  if (generate.length != 24) {
    var error = {
      check: false,
      is_error: true,
      message: 'User Not Found',
    };
    return res.status(200).send(error);
  } else {
    var result = user_details.findOne({
      generate_code: ObjectId(generate),
    });
    await result.exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
        };
        return res.status(600).send(error);
      } else if (!data) {
        var error = {
          check: false,
          is_error: true,
          message: 'User Not Found',
        };
        return res.status(200).send(error);
      } else {
        user_details
          .updateOne(
            {
              generate_code: ObjectId(generate),
            },
            {
              is_verified: true,
            }
          )
          .exec();
        var finaldata = {
          check: true,
          is_error: false,
          message: 'Data Send',
        };
        return res.status(200).send(finaldata);
      }
    });
  }
});

module.exports = router;
