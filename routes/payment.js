var express = require("express");
var router = express.Router();
var pool = require("./apiConfig/pool");

router.post("/addPayment", (req, res) => {
  // console.log("addPayment====>>>>");
  var qry = "";
  req.body.map((item) => {
    qry += `insert into payment set Account__c="${item.Account__c}", Description__c="${item.Description__c}", Email__c="${item.Email__c}", Email_Sent__c="${item.Email_Sent__c}", Name="${item.Name}", Opportunity__c="${item.Opportunity__c}", Order_Id__c="${item.Order_Id__c}", OwnerId="${item.OwnerId}", Payment_Amount__c="${item.Payment_Amount__c}", Payment_Date__c="${item.Payment_Date__c}", Payment_Link_Id__c="${item.Payment_Link_Id__c}", Payment_Mode__c="${item.Payment_Mode__c}", Payment_Status__c="${item.Payment_Status__c}", Share_Via_Link__c="${item.Share_Via_Link__c}", Short_URL__c="${item.Short_URL__c}", SMS__c="${item.SMS__c}", SMS_Sent__c="${item.SMS_Sent__c}", Created_date__c="${item.Created_date__c}" on duplicate key update Account__c="${item.Account__c}", Description__c="${item.Description__c}", Email__c="${item.Email__c}", Email_Sent__c="${item.Email_Sent__c}", Name="${item.Name}", Opportunity__c="${item.Opportunity__c}", Order_Id__c="${item.Order_Id__c}", OwnerId="${item.OwnerId}", Payment_Amount__c="${item.Payment_Amount__c}", Payment_Date__c="${item.Payment_Date__c}", Payment_Link_Id__c="${item.Payment_Link_Id__c}", Payment_Mode__c="${item.Payment_Mode__c}", Payment_Status__c="${item.Payment_Status__c}", Share_Via_Link__c="${item.Share_Via_Link__c}", Short_URL__c="${item.Short_URL__c}", SMS__c="${item.SMS__c}", SMS_Sent__c="${item.SMS_Sent__c}", Created_date__c="${item.Created_date__c}";`;
  });
  pool.query(qry, function (error, result) {
    if (error) {
      console.log("Error Of Payment", error);
      return res
        .status(400)
        .json({ status: false, message: "Server Error...", error });
    } else {
      console.log("Result Of Payment", result);
      return res
        .status(200)
        .json({ status: true, message: "Records Updated..", result });
    }
  });
});

// 8-feb

router.post("/showPayments", (req, res) => {
  // console.log("showPaymentss====", req.body);
  pool.query(
    `select P.*,E.Class_Type__c,E.Level__c from payment as P join enrollment__c as E on P.Account__c=E.Student__c where P.Account__c='${req.body.id}'`,
    // `select * from payment`,
    (err, result) => {
      if (err) {
        // console.log("errorrrr", err);
        return res.status(400).json();
      } else {

        console.log("resultt", result);

       

        return res.status(200).json({ status: true, result });
      }
    }
  );
});

module.exports = router;
