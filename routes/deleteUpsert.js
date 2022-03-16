var express = require("express");
var router = express.Router();
var pool = require("./apiConfig/pool");

router.post("/deleteItem", (req, res) => {
  var qry;
  var arr = req.body.RecordId;
  console.log("ARR=====", arr);
  var mapArr = arr
    .map((itm) => {
      return "'" + itm + "'";
    })
    .join(", ");
  console.log("mapArr", mapArr);
  console.log("Req.bodyyyyyyy=============", req.body);
  switch (req.body.sObjects != null) {
    case req.body.sObjects == "account":
      qry = `delete from account where Id IN(${mapArr})`;
      // console.log("In Account");
      break;
    case req.body.sObjects == "enrollment__c":
      // qry = `delete from enrollment__c where Id IN(${mapArr})`;
      // console.log("In enrollment__c");

      qry =
        `delete from session__c where Enrollment__c IN (${mapArr});` +
        `delete from enrollment__c where Id IN (${mapArr});`;

      break;

    case req.body.sObjects == "batch__c":
      qry = `delete from batch__c where Id IN(${mapArr})`;
      // console.log("In batch__c");
      break;

    case req.body.sObjects == "session__c":
      qry = `delete from session__c where Id IN(${mapArr})`;
      // console.log("In session");

      break;

    default:
      break;
  }
  console.log("qry========", qry);
  pool.query(qry, (err, result) => {
    if (err) {
      console.log("in error", err);
      return res.status(400).json([]);
    } else {
      console.log("in success", result);
      return res.status(200).json({ status: true, message: "Records deleted" });
    }
  });
});

module.exports = router;
