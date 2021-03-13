var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const connectDB = require("./db/db");
// var user_details = require("./modules/user_details");
//var category_details = require("./modules/interest_category");
//var club_details = require("./modules/club_details");
//var member_details = require("./modules/members_details")
//var event_details = require("./modules/event_details");

var indexRouter = require("./routes/index");
var eventsRouter = require("./routes/events");
var filterRouter = require("./routes/filter");
var usersRouter = require("./routes/users");
var clubRouter = require("./routes/clubs");
var profileRouter = require("./routes/profile");
var manageRouter = require("./routes/manage");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);
app.use("/api/events", eventsRouter);
app.use("/api/filter", filterRouter);
app.use("/api/profile", profileRouter);
app.use("/api/manage", manageRouter);
app.use("/users", usersRouter);
app.use("/club", clubRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

connectDB();

module.exports = app;
