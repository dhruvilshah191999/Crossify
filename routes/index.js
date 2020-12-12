var express = require("express");
var bcrypt = require("bcryptjs");
var category_details = require("../modules/interest_category");
var user_details = require("../modules/user_details");
const { check, validationResult } = require("express-validator");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", async function (req, res, next) {
  let { login_username, password } = req.body;
  var check = user_details.findOne({
    $and: [
      { $or: [{ username: login_username }, { email: login_username }] },
      { is_active: true },
    ],
  });
  await check.exec((err, data) => {
    if (err) {
      var error = {
        is_error: true,
        message: err.message,
      };
      return res.status(400).send(error);
    } else {
      if (data == null || data.length == 0) {
        var error = {
          is_error: true,
          message: "Username or Password invalid",
        };
        return res.status(500).send(error);
      } else {
        let token = data.generateAuthToken();
        var finaldata = {
          data: data,
          token: token,
          is_error: false,
        };
        return res.send(finaldata);
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
        message: "EmailID Exists.",
      };
      return res.status(502).send(error);
    } else if (data == null || data.length == 0) {
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
          console.log(err);
          var error = {
            is_error: true,
            message: err.message,
          };
          return res.status(503).send(error);
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

module.exports = router;
