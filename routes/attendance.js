var express = require("express");
var router = express.Router();
var pool = require("./apiConfig/pool");

router.post("/AttendanceUpstep", function (req, res, next) {
  var qry = "";
  req.body.map((item) => {
    qry += `insert into attendance__c set Attendance__c="${item.Attendance__c}", Name="${item.Name}", Coach_Session__c="${item.Coach_Session__c}", Date__c="${item.Date__c}", Enrollment__c="${item.Enrollment__c}", Feedback__c="${item.Feedback__c}", Feedback_Status__c="${item.Feedback_Status__c}", Class__c="${item.Class__c}", Student__c="${item.Student__c}", Attendance_UID__c="${item.Attendance_UID__c}";`;
  });
  pool.query(qry, function (error, result) {
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: "Server Error...", error });
    } else {
      return res
        .status(200)
        .json({ status: true, message: "Record Save", result });
    }
  });
});

module.exports = router;
