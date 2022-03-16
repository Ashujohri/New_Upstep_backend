var express = require("express");
var router = express.Router();
var pool = require("./apiConfig/pool");

router.post("/StudentUpstep", function (req, res, next) {
  // console.log("req.bodyyyy=====", req.body);
  var qry = "";
  req.body.map((item) => {
    // console.log("item====", item);
    qry += `insert into account set Aadhar_Card__pc="${item.Aadhar_Card__pc}", Aadhar_Number__c="${item.Aadhar_Number__c}", accountid__c="${item.accountid__c}", AccountNumber="${item.AccountNumber}", AccountSource="${item.AccountSource}", Alternate_Email__pc="${item.Alternate_Email__pc}", Alternate_Mobile__pc="${item.Alternate_Mobile__pc}", AnnualRevenue="${item.AnnualRevenue}", Batch_joining_Date__c="${item.Batch_joining_Date__c}", BillingAddress="${item.BillingAddress}", BillingCity="${item.BillingCity}", Date_of_birth__c="${item.Date_of_birth__c}", Email__c="${item.Email__c}", FIDE_Rating__pc="${item.FIDE_Rating__pc}", FirstName="${item.FirstName}", Guardian_s_Email__c="${item.Guardian_s_Email__c}", Guardian_s_Mobile_No__c="${item.Guardian_s_Mobile_No__c}", Guardian_s_Name__c="${item.Guardian_s_Name__c}", Id="${item.Id}", LastName="${item.LastName}", Level__c="${item.Level__c}", Name="${item.Name}", Phone="${item.Phone}", PhotoURL__c="${item.PhotoURL__c}", Region__c="${item.Region__c}", Relationship_Manager__c="${item.Relationship_Manager__c}", Student_Id__c="${item.Student_Id__c}", UA_rating__c="${item.UA_rating__c}", Referral_Code__c="${item.Referral_Code__c}", FIDE_Id__c="${item.FIDE_Id__c}", Country__c="${item.Country__c}", CurrencyIsoCodeux="${item.CurrencyIsoCodeux}", UA_Rating_Blitz__c="${item.UA_Rating_Blitz__c}", UA_Rating_Rapid__c="${item.UA_Rating_Rapid__c}", FIDE_Rating_Blitz__c="${item.FIDE_Rating_Blitz__c}", FIDE_Rating_Classical__c="${item.FIDE_Rating_Classical__c}", FIDE_Rating_Rapid__c="${item.FIDE_Rating_Rapid__c}", Time_Zone__c="${item.Time_Zone__c}" on duplicate key update Aadhar_Card__pc="${item.Aadhar_Card__pc}", Aadhar_Number__c="${item.Aadhar_Number__c}", accountid__c="${item.accountid__c}", AccountNumber="${item.AccountNumber}", AccountSource="${item.AccountSource}", Alternate_Email__pc="${item.Alternate_Email__pc}", Alternate_Mobile__pc="${item.Alternate_Mobile__pc}", AnnualRevenue="${item.AnnualRevenue}", Batch_joining_Date__c="${item.Batch_joining_Date__c}", BillingAddress="${item.BillingAddress}", BillingCity="${item.BillingCity}", Date_of_birth__c="${item.Date_of_birth__c}", Email__c="${item.Email__c}", FIDE_Rating__pc="${item.FIDE_Rating__pc}", FirstName="${item.FirstName}", Guardian_s_Email__c="${item.Guardian_s_Email__c}", Guardian_s_Mobile_No__c="${item.Guardian_s_Mobile_No__c}", Guardian_s_Name__c="${item.Guardian_s_Name__c}", Id="${item.Id}", LastName="${item.LastName}", Level__c="${item.Level__c}", Name="${item.Name}", Phone="${item.Phone}", PhotoURL__c="${item.PhotoURL__c}", Region__c="${item.Region__c}", Relationship_Manager__c="${item.Relationship_Manager__c}", Student_Id__c="${item.Student_Id__c}", UA_rating__c="${item.UA_rating__c}", Referral_Code__c="${item.Referral_Code__c}", FIDE_Id__c="${item.FIDE_Id__c}", Country__c="${item.Country__c}", CurrencyIsoCodeux="${item.CurrencyIsoCodeux}", UA_Rating_Blitz__c="${item.UA_Rating_Blitz__c}", UA_Rating_Rapid__c="${item.UA_Rating_Rapid__c}", FIDE_Rating_Blitz__c="${item.FIDE_Rating_Blitz__c}", FIDE_Rating_Classical__c="${item.FIDE_Rating_Classical__c}", FIDE_Rating_Rapid__c="${item.FIDE_Rating_Rapid__c}", Time_Zone__c="${item.Time_Zone__c}";`;
  });
  // console.log("qryyyyy======", qry);
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

module.exports = router;
