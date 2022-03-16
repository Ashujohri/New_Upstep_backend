var express = require("express");
var router = express.Router();
var pool = require("./apiConfig/pool");

router.post("/AddEnrollment", function (req, res, next) {
  // console.log("req.bodyyyy==CourseUpstep====", req.body);
  var qry = " ";
  req.body.map((item) => {
    // console.log("item", item);
    qry += `insert into enrollment__c set Batch__c="${item.Batch__c}", Class_Type__c="${item.Class_Type__c}", CreatedById="${item.CreatedById}", CreatedDate="${item.CreatedDate}", Enrollment_Date__c="${item.Enrollment_Date__c}", enrollmentids__c="${item.enrollmentids__c}", Id="${item.Id}", IsDeleted="${item.IsDeleted}", LastModifiedById="${item.LastModifiedById}", LastModifiedDate="${item.LastModifiedDate}", LastReferencedDate="${item.LastReferencedDate}", LastViewedDate="${item.LastViewedDate}", Name="${item.Name}", Opportunity__c="${item.Opportunity__c}", OwnerId="${item.OwnerId}", relation_formula__c="${item.relation_formula__c}", Student__c="${item.Student__c}", Student_Email__c="${item.Student_Email__c}", SystemModstamp="${item.SystemModstamp}", Batch_Start_Date__c="${item.Batch_Start_Date__c}", Level__c="${item.Level__c}", Assessment_Score__c="${item.Assessment_Score__c}", Enrollment_Status__c="${item.Enrollment_Status__c}", Attendance__c="${item.Attendance__c}", End_Date__c="${item.End_Date__c}" on duplicate key update Batch__c="${item.Batch__c}", Class_Type__c="${item.Class_Type__c}", CreatedById="${item.CreatedById}", CreatedDate="${item.CreatedDate}", Enrollment_Date__c="${item.Enrollment_Date__c}", enrollmentids__c="${item.enrollmentids__c}", Id="${item.Id}", IsDeleted="${item.IsDeleted}", LastModifiedById="${item.LastModifiedById}", LastModifiedDate="${item.LastModifiedDate}", LastReferencedDate="${item.LastReferencedDate}", LastViewedDate="${item.LastViewedDate}", Name="${item.Name}", Opportunity__c="${item.Opportunity__c}", OwnerId="${item.OwnerId}", relation_formula__c="${item.relation_formula__c}", Student__c="${item.Student__c}", Student_Email__c="${item.Student_Email__c}", SystemModstamp="${item.SystemModstamp}", Batch_Start_Date__c="${item.Batch_Start_Date__c}", Level__c="${item.Level__c}", Assessment_Score__c="${item.Assessment_Score__c}", Enrollment_Status__c="${item.Enrollment_Status__c}", Attendance__c="${item.Attendance__c}", End_Date__c="${item.End_Date__c}";`;
  });

  pool.query(qry, function (error, result) {
    if (error) {
      // console.log("Error", error);
      return res
        .status(400)
        .json({ status: false, message: "Server Error", error });
    } else if (result.affectedRows > 1) {
      return res
        .status(200)
        .json({ status: true, message: "Record update", result });
    } else {
      return res
        .status(200)
        .json({ status: true, message: "Record save", result });
    }
  });
});

router.post("/CourseDisplay", function (req, res, next) {
  var qry = `select * from enrollment__c where Student_Email__c='${req.body.email}';`;
  pool.query(qry, function (error, result) {
    if (error) {
      // console.log("Error DIsplay API", error);
      return res.status(400).json({ status: false, message: "Error Occurred" });
    } else {
      // console.log("RESULT COURSE DISPLAY", result);
      return res
        .status(200)
        .json({ status: true, message: "Record Found...", result });
    }
  });
});

module.exports = router;
