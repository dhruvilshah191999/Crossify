var express = require("express");
const passport = require("passport");
var cors = require("cors");
var user_details = require("../modules/user_details");
const facebookStrategy = require("passport-facebook").Strategy;
var router = express.Router();

// var corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200,
//   methods: "GET, PUT",
// };
// router.use(cors(corsOptions));

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  user_details.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new facebookStrategy(
    {
      clientID: "393912875359725",
      clientSecret: "1ab2a5b8a6fd3ba9b0d5893fdca94930",
      callbackURL: "http://localhost:5000/api/facebook/callback",
      profileFields: [
        "id",
        "displayName",
        "name",
        "gender",
        "picture.type(large)",
        "email",
      ],
    },
    async function (token, refreshToken, profile, done) {
      var check = user_details.findOne({ uid: profile.id });
      await check.exec((err, data) => {
        if (err) return done(err);

        if (data) {
          console.log("user found");
          console.log(data);
          return done(err, data);
        } else {
          var user = new user_details({
            uid: profile.id,
            fname: profile.name.givenName,
            lname: profile.name.familyName,
            email: profile.emails[0].value,
            profile_photo: profile.photos[0].value,
          });
          user.save(function (err) {
            if (err) throw err;
            return done(null, user);
          });
        }
      });
    }
  )
);

router.get("/harshil", function (req, res, next) {
  res.send("Harshil Patel");
});
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get(
  "/auth/facebook",
  // function (req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //   next();
  // },
  // cors(),
  passport.authenticate("facebook", { scope: "email" })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/api/profile",
    failureRedirect: "/api/failed",
  })
);

router.get("/profile", (req, res) => {
  res.send("you are a valid user");
});

router.get("/failed", (req, res) => {
  res.send("you are a non valid user");
});

module.exports = router;
