var express = require("express");
var bcrypt = require("bcryptjs");
var auth = require("../middleware/auth");
var user_details = require("../modules/user_details");

var CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
dotenv.config();
const { ObjectId } = require("bson");
const config = require("config");
const secret = process.env.SECRET;

var router = express.Router();

router.post("/login", async function (req, res, next) {
  let { login_username, password } = req.body;
  console.log(login_username, password);
  var check = user_details.findOne(
    {
      $and: [
        { $or: [{ username: login_username }, { email: login_username }] },
        { is_active: true },
      ],
    },
    { _id: 1, fname: 1, lname: 1, profile_photo: 1, password: 1 }
  );
  await check.exec((err, data) => {
    console.log(err, data);
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(400).send(error);
    } else {
      if (data === null || data.length === 0) {
        var error = {
          is_error: true,
          message: "Username or Password invalid",
        };
        return res.status(500).send(error);
      } else {
        var check_pass = data.password;
        if (bcrypt.compareSync(password, check_pass)) {
          let token = data.generateAuthToken();
          var ciphertext = CryptoJS.AES.encrypt(
            JSON.stringify(token),
            secret
          ).toString();
          var finaldata = {
            data: data,
            token: ciphertext,
            is_error: false,
            message: "Signin Successfully",
          };
          return res.send(finaldata);
        } else {
          var error = {
            is_error: true,
            message: "Username or Password invalid",
          };
          return res.status(500).send(error);
        }
      }
    }
  });
});

router.post("/signup", async function (req, res, next) {
  var { fname, lname, password, email, photo } = req.body;
  var check = user_details.findOne({ email: email, is_active: 1 });
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
        message: "This EmailId Already Exists.",
      };
      return res.status(500).send(error);
    } else if (data === null || data.length === 0) {
      password = bcrypt.hashSync(password, 10);
      var user = new user_details({
        email,
        fname,
        lname,
        password,
        profile_photo: photo,
      });
      user.save((err) => {
        if (err) {
          var error = {
            is_error: true,
            message: err.message,
          };
          return res.status(500).send(error);
        } else {
          var finaldata = {
            email,
            message: "Signup Successfully",
            is_error: false,
          };
          return res.send(finaldata);
        }
      });
    }
  });
});

router.post("/socialsignin", async function (req, res, next) {
  var { socialId, email } = req.body;
  var check = user_details.findOne(
    {
      email: email,
      socialId: socialId,
      is_active: 1,
    },
    { _id: 1, fname: 1, lname: 1, profile_photo: 1 }
  );
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err,
      };
      return res.status(500).send(error);
    } else if (data) {
      let token = data.generateAuthToken();
      var ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(token),
        secret
      ).toString();
      var finaldata = {
        data: data,
        token: ciphertext,
        is_error: false,
        message: "Signin Successfully",
      };
      return res.send(finaldata);
    } else {
      var error = {
        is_error: true,
        message: "This account don't exits",
      };
      return res.status(500).send(error);
    }
  });
});

router.post("/socialsignup", async function (req, res, next) {
  var { socialId, fname, lname, photo, email } = req.body;
  var check = user_details.findOne({
    $or: [{ email: email }, { socialId: socialId }],
    is_active: 1,
  });
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err,
      };
      return res.status(500).send(error);
    } else if (data) {
      var error = {
        is_error: true,
        message: "This Account Already Exists.",
      };
      return res.status(500).send(error);
    } else if (data === null || data.length === 0) {
      var user = new user_details({
        socialId,
        email,
        fname,
        lname,
        profile_photo: photo,
      });
      user.save((err) => {
        if (err) {
          var error = {
            is_error: true,
            message: err.message,
          };
          return res.status(500).send(error);
        } else {
          var finaldata = {
            email,
            message: "Signup Successfully",
            is_error: false,
          };
          return res.send(finaldata);
        }
      });
    }
  });
});

router.post("/socialstep2", async function (req, res, next) {
  var {
    email,
    username,
    password,
    city,
    state,
    pincode,
    address,
    lat,
    long,
  } = req.body;
  var check = user_details.findOne({ username: username, is_active: 1 });
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err,
      };
      return res.status(500).send(error);
    } else if (data) {
      var error = {
        is_error: true,
        message: "This Username Already Exists.",
      };
      return res.status(500).send(error);
    } else if (data === null || data.length === 0) {
      password = bcrypt.hashSync(password, 10);
      var update = user_details.findOneAndUpdate(
        { email: email },
        {
          username: username,
          password: password,
          address: address,
          city: city,
          state: state,
          pincode: pincode,
          latitude: lat,
          longitude: long,
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
    }
  });
});

router.post("/change-password", async function (req, res, next) {
  let { user_id, oldPassword, newPassword } = req.body;
  var check = user_details.findOneAndUpdate({
    $and: [{ _id: ObjectId(user_id) }, { is_active: true }],
  });
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(400).send(error);
    } else {
      if (data === null || data.length === 0) {
        var error = {
          is_error: true,
          message: "Password invalid",
        };
        return res.status(500).send(error);
      } else {
        var check_pass = data.password;
        if (bcrypt.compareSync(oldPassword, check_pass)) {
          let token = data.generateAuthToken();
          var ciphertext = CryptoJS.AES.encrypt(
            JSON.stringify(token),
            secret
          ).toString();
          var finaldata = {
            data: data,
            token: ciphertext,
            is_error: false,
            message: "Password is valid",
          };
          if (!finaldata.is_error) {
            password = bcrypt.hashSync(newPassword, 10);
            var update = user_details.findOneAndUpdate(
              { _id: ObjectId(user_id) },
              {
                password: password,
              }
            );
            update.exec((err, ans) => {
              if (err) {
                var error = {
                  is_error: true,
                  message: err.message,
                };
                return res.status(500).send(error);
              } else {
                var finaldata2 = {
                  password: password,
                  message: "Password changed successfully",
                  is_error: false,
                };
                return res.status(200).send(finaldata2);
              }
            });
          }
        } else {
          var error = {
            is_error: true,
            message: "Password invalid",
          };
          return res.status(500).send(error);
        }
      }
    }
  });
});

router.post("/step2", async function (req, res, next) {
  var {
    email,
    username,
    city,
    state,
    pincode,
    address,
    lat,
    long,
    about_me,
    occupation,
  } = req.body;
  var check = user_details.findOne({ username: username, is_active: 1 });
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err,
      };
      return res.status(500).send(error);
    } else if (data) {
      var error = {
        is_error: true,
        message: "This Username Already Exists.",
      };
      return res.status(500).send(error);
    } else if (data === null || data.length === 0) {
      var update = user_details.findOneAndUpdate(
        { email: email },
        {
          username: username,
          address: address,
          city: city,
          state: state,
          pincode: pincode,
          latitude: lat,
          longitude: long,
          occupation,
          about_me,
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
    }
  });
});

router.post("/auth", auth, async function (req, res, next) {
  user_details
    .findOne(
      { _id: ObjectId(req.user._id), is_active: 1 },
      { _id: 1, profile_photo: 1, username: 1 }
    )
    .exec((err, data) => {
      return res.status(200).send(data);
    });
});

router.post("/notification", auth, async function (req, res, next) {
  user_details
    .find(
      {
        _id: ObjectId(req.user._id),
        is_active: true,
      },
      {
        inbox: 1,
      }
    )
    .sort({ "inbox.date": -1 })
    .limit(10)
    .exec((err, data) => {
      if (err) {
        var error = {
          is_error: true,
          message: err.message,
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

module.exports = router;
