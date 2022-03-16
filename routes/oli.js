var express = require("express");
var router = express.Router();
var pool = require("./apiConfig/pool");

router.post("/OliAddUpdate", function (req, res, next) {
  console.log("REQ DOT BODY OF /OliAddUpdate", req.body);
  var qry = "";
  req.body.map((item) => {
    qry += `insert into oli set Product2Id="${item.Product2Id}", Curriculum_Code__c="${item.Curriculum_Code__c}", ServiceDate="${item.ServiceDate}", Discount="${item.Discount}", Description="${item.Description}", ListPrice="${item.ListPrice}", OpportunityId="${item.OpportunityId}", Name="${item.Name}", ProductCode="${item.ProductCode}", Quantity="${item.Quantity}", UnitPrice="${item.UnitPrice}", Subtotal="${item.Subtotal}", TotalPrice="${item.TotalPrice}", OLIid__c="${item.OLIid__c}" on duplicate key update Product2Id="${item.Product2Id}", Curriculum_Code__c="${item.Curriculum_Code__c}", ServiceDate="${item.ServiceDate}", Discount="${item.Discount}", Description="${item.Description}", ListPrice="${item.ListPrice}", OpportunityId="${item.OpportunityId}", Name="${item.Name}", ProductCode="${item.ProductCode}", Quantity="${item.Quantity}", UnitPrice="${item.UnitPrice}", Subtotal="${item.Subtotal}", TotalPrice="${item.TotalPrice}", OLIid__c="${item.OLIid__c}";`;
  });
  pool.query(qry, function (error, result) {
    if (error) {
      console.log("Error", error);
      return res
        .status(400)
        .json({ status: false, message: "Server Error...", error });
    } else {
      console.log("Resultttt.......VoucherAddUpdate-18", result);
      return res
        .status(200)
        .json({ status: true, message: "Record Save", result });
    }
  });
});

module.exports = router;
