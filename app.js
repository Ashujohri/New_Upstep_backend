var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var LoginRouter = require("./routes/login");
var StudentRouter = require("./routes/student");
var StudentApiRouter = require("./routes/studentapi");
var BatchApiRouter = require("./routes/batchapi");
var EnrollmentApiRouter = require("./routes/enrollment");
var referandearnRouter = require("./routes/referandearn");
var CartApiRouter = require("./routes/cart");
var HomeworkMasterApiRouter = require("./routes/homework_masterapi");
var HomeworkApiRouter = require("./routes/homeworkapi");
var PaymentRouter = require("./routes/payment");
var AttendanceRouter = require("./routes/attendance");
var CourseRouter = require("./routes/course");
var LeadRouter = require("./routes/leadapi");
var RefreesRouter = require("./routes/Refrees");
var FeedbackRouter = require("./routes/feedback");
var VoucherRouter = require("./routes/voucher");
var OliRouter = require("./routes/oli");
var OpportunityRouter = require("./routes/opportunity");
var deleteApi = require("./routes/deleteUpsert");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
//app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/Login", LoginRouter);
app.use("/Student", StudentRouter);
app.use("/BatchApi", BatchApiRouter);
app.use("/StudentApi", StudentApiRouter);
app.use("/EnrollmentApi", EnrollmentApiRouter);
app.use("/referandearn", referandearnRouter);
app.use("/Cart", CartApiRouter);
app.use("/HomeworkMaster", HomeworkMasterApiRouter);
app.use("/Homework", HomeworkApiRouter);
app.use("/Payment", PaymentRouter);
app.use("/AttendanceApi", AttendanceRouter);
app.use("/Course", CourseRouter);
app.use("/Lead", LeadRouter);
app.use("/Refrees", RefreesRouter);
app.use("/feedback", FeedbackRouter);

app.use("/voucher", VoucherRouter);
app.use("/oli", OliRouter);

app.use("/opportunity", OpportunityRouter);
app.use("/deleteData", deleteApi);

app.use(express.static(path.join(__dirname, "public/build")));

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

module.exports = app;

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var LoginRouter = require("./routes/login");
var StudentRouter = require("./routes/student");
var StudentApiRouter = require("./routes/studentapi");
var BatchApiRouter = require("./routes/batchapi");
var EnrollmentApiRouter = require("./routes/enrollment");
var referandearnRouter = require("./routes/referandearn");
var CartApiRouter = require("./routes/cart");
var HomeworkMasterApiRouter = require("./routes/homework_masterapi");
var HomeworkApiRouter = require("./routes/homeworkapi");
var PaymentRouter = require("./routes/payment");
var AttendanceRouter = require("./routes/attendance");
var CourseRouter = require("./routes/course");
var LeadRouter = require("./routes/leadapi");
var RefreesRouter = require("./routes/Refrees");
var FeedbackRouter = require("./routes/feedback");
var VoucherRouter = require("./routes/voucher");
var OliRouter = require("./routes/oli");
var OpportunityRouter = require("./routes/opportunity");
var deleteApi = require("./routes/deleteUpsert");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
//app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/Login", LoginRouter);
app.use("/Student", StudentRouter);
app.use("/BatchApi", BatchApiRouter);
app.use("/StudentApi", StudentApiRouter);
app.use("/EnrollmentApi", EnrollmentApiRouter);
app.use("/referandearn", referandearnRouter);
app.use("/Cart", CartApiRouter);
app.use("/HomeworkMaster", HomeworkMasterApiRouter);
app.use("/Homework", HomeworkApiRouter);
app.use("/Payment", PaymentRouter);
app.use("/AttendanceApi", AttendanceRouter);
app.use("/Course", CourseRouter);
app.use("/Lead", LeadRouter);
app.use("/Refrees", RefreesRouter);
app.use("/feedback", FeedbackRouter);

app.use("/voucher", VoucherRouter);
app.use("/oli", OliRouter);

app.use("/opportunity", OpportunityRouter);
app.use("/deleteData", deleteApi);

app.use(express.static(path.join(__dirname, "public/build")));

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

module.exports = app;
