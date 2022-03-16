var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
var pool = require("./apiConfig/pool");
var SF_Access_Token = require("../config/secrete.json");

router.post("/Add", function (req, res, next) {
  console.log("Request body of Lead API", req.body);
  var requestOptions = {
    method: "POST",
  };

  var AccessTokenResult = fetch(
    // `https://test.salesforce.com/services/oauth2/token?grant_type=refresh_token&refresh_token=5Aep861fKAwJJ.FediNvLTNeQ98GvBrlpByuUb7hpLIk3awpIcFUJYOYH6kfZNJn.8XrGsuM7OJ4hxnbiZZMcoL&client_id=3MVG9aWdXtdHRrI0KyWWLIRHwh_gOMgBD2WPusPVlcdzk6AAbzKlLhSc7qrS5NNOrdWxnfEp3I__TmfM3Tvx9&client_secret=952309D3AA050288F3081893587463E4DB1F6C16CC6ED6F51FE736B86B3C484D`,
    `${SF_Access_Token.SF_Access_Token}`,
    requestOptions
  )
    .then((response) => response.json())
    .then(async (result) => {
      // console.log("Access Token Result", result, JSON.stringify(req.body));
      var requestOptions2 = {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=utf-8",
          Authorization: `Bearer ${result.access_token}`,
        },
        body: JSON.stringify(req.body),
      };
      var re = await fetch(
        // `https://upstepacademy--dev2.my.salesforce.com/services/apexrest/v1/LeadServiceAPI`,
        `https://upstepacademy.my.salesforce.com/services/apexrest/v1/LeadServiceAPI`,
        requestOptions2
      );
      var response = await re.json();
      console.log("RESPONSE OF LEAD API", response);
      return res
        .status(200)
        .json({ status: true, message: "successful", response });
    })
    .catch((error) => {
      console.log("Access Token Error", error);
      return res.status(400).json({ status: false, message: "Error occurred" });
    });
});

// Show Calender in Attendence

router.post("/AttendenceShow", (req, res) => {
  // console.log("req.body of Attendance Body ", req.body);
  var qry = `SELECT C.*, CASE WHEN C.Attendance_Status__c ='null' then 'Planned' when C.Attendance_Status__c = null then 'Planned' else C.Attendance_Status__c END as Attendance_show, E.Level__c FROM session__c C join enrollment__c E on C.Enrollment__c=E.Id where E.Student__c='${req.body.id}'and E.Enrollment_Status__c='Upcoming'`;
  pool.query(qry, (err, result) => {
    if (err) {
      // console.log("errorrrr====AttendenceShow", err);
      return res.status(400).json([]);
    } else {
      // console.log("resulttt======AttendenceShow", result);
      return res
        .status(200)
        .json({ status: true, message: "Records found", result: result });
    }
  });
});


module.exports = router;
