var express = require("express");
var router = express.Router();
var pool = require("./apiConfig/pool");

router.post("/AddRef", function (req, res, next) {
  var qry = " ";
  req.body.map((item) => {
    qry += `insert into refrees set FirstName="${item.FirstName}", LastName="${item.LastName}", Status="${item.Status}", Email__c="${item.Email__c}", Phone="${item.Phone}", Id="${item.Id}", Referred_Code__c="${item.Referred_Code__c}", Account__c="${item.Account__c}" on duplicate key update FirstName="${item.FirstName}", LastName="${item.LastName}", Status="${item.Status}", Email__c="${item.Email__c}", Phone="${item.Phone}", Id="${item.Id}", Referred_Code__c="${item.Referred_Code__c}", Account__c="${item.Account__c}";`;
  });
  pool.query(qry, function (error, result) {
    if (error) {
      // console.log("ERROR OF LEAD GENERATE", error);
      return res
        .status(400)
        .json({ status: false, message: "Error Occured", error });
    } else {
      // console.log("RESULT OF LEAD GENERATE ", result);
      return res
        .status(200)
        .json({ status: true, message: "Record Generate", result: result });
    }
  });
});

module.exports = router;
