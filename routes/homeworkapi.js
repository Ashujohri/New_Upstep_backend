var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
var pool = require("./apiConfig/pool");

router.post("/HomeworkUpstep", function (req, res, next) {
  // console.log("REQ DOT BODY OF HOMEWORK", req.body);
  var qry = "";
  req.body.map((item) => {
    qry += `insert into homework__c set Batch__c="${item.Batch__c}", CreatedById="${item.CreatedById}", CreatedDate="${item.CreatedDate}", Id="${item.Id}", IsDeleted="${item.IsDeleted}", LastActivityDate="${item.LastActivityDate}", LastModifiedById="${item.LastModifiedById}", LastModifiedDate="${item.LastModifiedDate}", LastReferencedDate="${item.LastReferencedDate}", LastViewedDate="${item.LastViewedDate}", Name="${item.Name}", Note__c="${item.Note__c}", OwnerId="${item.OwnerId}", SystemModstamp="${item.SystemModstamp}", Assigned__c="${item.Assigned__c}", Deadline__c="${item.Deadline__c}", Topic__c="${item.Topic__c}", Session__c="${item.Session__c}", Homework_Status__c="${item.Homework_Status__c}", Homework_link__c="${item.Homework_link__c}" on duplicate key update Batch__c="${item.Batch__c}", CreatedById="${item.CreatedById}", CreatedDate="${item.CreatedDate}", Id="${item.Id}", IsDeleted="${item.IsDeleted}", LastActivityDate="${item.LastActivityDate}", LastModifiedById="${item.LastModifiedById}", LastModifiedDate="${item.LastModifiedDate}", LastReferencedDate="${item.LastReferencedDate}", LastViewedDate="${item.LastViewedDate}", Name="${item.Name}", Note__c="${item.Note__c}", OwnerId="${item.OwnerId}", SystemModstamp="${item.SystemModstamp}", Assigned__c="${item.Assigned__c}", Deadline__c="${item.Deadline__c}", Topic__c="${item.Topic__c}", Session__c="${item.Session__c}", Homework_Status__c="${item.Homework_Status__c}", Homework_link__c="${item.Homework_link__c}";`;
  });
  pool.query(qry, function (error, result) {
    if (error) {
      // console.log("Error", error);
      return res
        .status(400)
        .json({ status: false, message: "Server Error...", error });
    } else {
      // console.log("Resultttt.......", result);
      return res
        .status(200)
        .json({ status: true, message: "Record Save", result });
    }
  });
});

// 12 jan
router.post("/showHomeworks", (req, res) => {
  // console.log("showHomeworks=============", req.body.id);
  // localStorage.setItem("studentId", req.body.id);
  console.log("showHomeworkss====", req.body);
  pool.query(
    // `select S.*,E.Id as enroll_id from session__c as S join enrollment__c as E on S.Enrollment__c=E.Id where E.Student__c='${req.body.id}' and S.Homework_available__c='true' and S.Session_Status__c='Completed' and Is_completed__c='false' ;`,

    `select S.*,E.Id as enroll_id from session__c as S join enrollment__c as E on S.Enrollment__c=E.Id where E.Student__c='${req.body.id}' and S.Homework_available__c='true' and S.Session_Status__c='Completed' and Is_completed__c='false' and S.Homework_Deadline__c > CURDATE() order by Date__c desc`,
    (err, resultt) => {
      if (err) {
        // console.log("errorrrr", err);
        return res.status(400).json();
      } else {
        // console.log("resultt", resultt);
        if (resultt.length < 1) {
          return res.status(200).json({
            status: false,
            message: "Record Not exist on this emailId",
            resultt,
          });
        } else {
          return res
            .status(200)
            .json({ status: true, message: "Record found", resultt });
        }
      }
    }
  );
});

// 8-jan

router.post("/showPastHomeworks", (req, res) => {
  console.log("showPastHomeworkss====", req.body);
  pool.query(
    // `select S.* from session__c as S join enrollment__c as E on S.Enrollment__c=E.Id where E.Student__c='${req.body.id}' and S.Homework_available__c='true' and S.Session_Status__c='Completed' and S.Is_completed__c='true';`,

    `select S.* from session__c as S join enrollment__c as E on S.Enrollment__c=E.Id where E.Student__c='${req.body.id}' and S.Homework_available__c='true' and S.Homework_Deadline__c < CURDATE() order by Homework_Deadline__c desc `,

    // and Is_completed__c='true'
    (err, resultt) => {
      if (err) {
        console.log("errorrrr", err);
        return res.status(400).json();
      } else {
        // console.log("resultt", resultt);
        if (resultt.length < 1) {
          return res.status(200).json({
            status: false,
            message: "Record Not exist on this emailId",
            resultt,
          });
        } else {
          return res
            .status(200)
            .json({ status: true, message: "Record found", resultt });
        }
      }
    }
  );
});

// 7-feb-2022
router.post("/showHomeworksForNextDate", (req, res) => {
  // console.log("showHomeworks=============", req.body.id);
  // console.log("showHomeworkss====", req.body);
  pool.query(
    `select S.*,E.Id as enroll_id from session__c as S join enrollment__c as E on S.Enrollment__c=E.Id where E.Student__c='${req.body.id}' and S.Homework_available__c='true' and S.Session_Status__c='Completed' and Is_completed__c='false' ;`,
    (err, resultt) => {
      if (err) {
        // console.log("errorrrr", err);
        return res.status(400).json();
      } else {
        // console.log("resultt", resultt);
        if (resultt.length < 1) {
          return res.status(200).json({
            status: false,
            message: "Record Not exist on this emailId",
            resultt,
          });
        } else {
          return res
            .status(200)
            .json({ status: true, message: "Record found", resultt });
        }
      }
    }
  );
});

module.exports = router;
