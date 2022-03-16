var express = require("express");
var router = express.Router();
var pool = require("./apiConfig/pool");
var SF_Access_Token = require("../config/secrete.json");
const fetch = require("node-fetch");

router.post("/addOpportunity", (req, res) => {
  // console.log("addPayment====>>>>");
  var qry = "";
  req.body.map((item) => {
    qry += `insert into opportunity set AccountId="${item.AccountId}", Address__c="${item.Address__c}", Amount="${item.Amount}", CloseDate="${item.CloseDate}", Demo_Counsellor__c="${item.Demo_Counsellor__c}", Description="${item.Description}", Email__c="${item.Email__c}", LeadSource="${item.LeadSource}", Name="${item.Name}", Next_Payment_Date__c="${item.Next_Payment_Date__c}", OwnerId="${item.OwnerId}", Probability="${item.Probability}", Region__c="${item.Region__c}", Relationship_Manager__c="${item.Relationship_Manager__c}", StageName="${item.StageName}", Payment_Due_Date__c="${item.Payment_Due_Date__c}", UA_RATING__c="${item.UA_RATING__c}", Tax__c="${item.Tax__c}", UA_Credit_Points__c="${item.UA_Credit_Points__c}", Total_Price__c="${item.Total_Price__c}", Tax_Amount__c="${item.Tax_Amount__c}", City__c="${item.City__c}", State_Provinance__c="${item.State_Provinance__c}", Zip_Postal_Code__c="${item.Zip_Postal_Code__c}", Country__c="${item.Country__c}", oppuniqueid__c="${item.oppuniqueid__c}" on duplicate key update AccountId="${item.AccountId}", Address__c="${item.Address__c}", Amount="${item.Amount}", CloseDate="${item.CloseDate}", Demo_Counsellor__c="${item.Demo_Counsellor__c}", Description="${item.Description}", Email__c="${item.Email__c}", LeadSource="${item.LeadSource}", Name="${item.Name}", Next_Payment_Date__c="${item.Next_Payment_Date__c}", OwnerId="${item.OwnerId}", Probability="${item.Probability}", Region__c="${item.Region__c}", Relationship_Manager__c="${item.Relationship_Manager__c}", StageName="${item.StageName}", Payment_Due_Date__c="${item.Payment_Due_Date__c}", UA_RATING__c="${item.UA_RATING__c}", Tax__c="${item.Tax__c}", UA_Credit_Points__c="${item.UA_Credit_Points__c}", Total_Price__c="${item.Total_Price__c}", Tax_Amount__c="${item.Tax_Amount__c}", City__c="${item.City__c}", State_Provinance__c="${item.State_Provinance__c}", Zip_Postal_Code__c="${item.Zip_Postal_Code__c}", Country__c="${item.Country__c}", oppuniqueid__c="${item.oppuniqueid__c}";`;
  });
  pool.query(qry, function (error, result) {
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: "Server Error...", error });
    } else {
      // console.log("RESULT OF OPPORTUNITY", result);
      return res
        .status(200)
        .json({ status: true, message: "Records Updated..", result });
    }
  });
});

/// 14-feb

router.post("/insertOpportunity", (req, res) => {
  // console.log("insertOpportunity===30=", req.body);
  var requestOptions = {
    method: "POST",
  };

  let ApiBeforLogIn_Result = fetch(
    /// Fetch-AccessToken Api.....
    `${SF_Access_Token.SF_Access_Token}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((resultttt) => {
      /// Salesforce Log In Api..

      // console.log("ACCESS TOKEN-------- 42", resultttt.access_token);

      // var body1 = [req.body];

      fetch(
        ///// Fetch Product Api.....
        // `https://upstepacademy.my.salesforce.com//services/data/v51.0/query/?q=Select+Id,IsActive,Batch_Frequency__c ,Class_Type_c,Countryc,Curriculum_Codec,Description,Family,Name,Levelc,Total_No_of_Sessionc,Total_No_of_Sub_Level_c+from+Product2`,
        `https://upstepacademy.my.salesforce.com/services/apexrest/v1/insertOpportunity`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${resultttt.access_token}`,
          },
          body: JSON.stringify([req.body]),
          method: "POST",
        }
      )
        .then((answer) => answer.json())
        .then((finalAnswer) => {
          // console.log("finalAnswer==============58", finalAnswer);
          if (finalAnswer.status) {
            return res.status(200).json({
              status: true,
              finalAnswer,
              tokenn: resultttt.access_token,
            });
          } else {
            return res.status(200).json({ status: false });
          }
        })
        .catch((error) => {
          // console.log("error", error);
          return res
            .status(400)
            .json({ status: false, message: "Error Occurred", error });
        });
    });
});
module.exports = router;
