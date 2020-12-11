var express = require("express");
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
        message: err,
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

router.post("/category", async function (req, res, next) {
  var { category_name, description } = req.body;
  console.log("Hello");
  try {
    var category = new category_details({
      category_name,
      description,
    });
    await category.save();
    return res.send("added");
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;
