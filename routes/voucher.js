var express = require("express");
var router = express.Router();
var pool = require("./apiConfig/pool");

router.post("/VoucherAddUpdate", function (req, res, next) {
  console.log("REQ DOT BODY OF VoucherAddUpdate", req.body);
  var qry = "";
  req.body.map((item) => {
    qry += `insert into voucher set Account__c="${item.Account__c}", Opportunity__c="${item.Opportunity__c}", Consumption_date__c="${item.Consumption_date__c}", Country__c="${item.Country__c}", Currency__c="${item.Currency__c}", Voucher_Amount__c="${item.Voucher_Amount__c}", Voucher_code__c="${item.Voucher_code__c}", Voucher_End_date__c="${item.Voucher_End_date__c}", Voucher_Generation_Date__c="${item.Voucher_Generation_Date__c}", Name="${item.Name}", Voucher_Status__c="${item.Voucher_Status__c}", Voucher_Type__c="${item.Voucher_Type__c}", VoucherId__c="${item.VoucherId__c}" on duplicate key update Account__c="${item.Account__c}", Opportunity__c="${item.Opportunity__c}", Consumption_date__c="${item.Consumption_date__c}", Country__c="${item.Country__c}", Currency__c="${item.Currency__c}", Voucher_Amount__c="${item.Voucher_Amount__c}", Voucher_code__c="${item.Voucher_code__c}", Voucher_End_date__c="${item.Voucher_End_date__c}", Voucher_Generation_Date__c="${item.Voucher_Generation_Date__c}", Name="${item.Name}", Voucher_Status__c="${item.Voucher_Status__c}", Voucher_Type__c="${item.Voucher_Type__c}", VoucherId__c="${item.VoucherId__c}";`;
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
