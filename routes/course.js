var express = require("express");
var router = express.Router();
var pool = require("./apiConfig/pool");
var SF_Access_Token = require("../config/secrete.json");
const fetch = require("node-fetch");

router.post("/AddCourse", (req, res) => {
  // console.log("Req.body==>>", req.body);
  var qry = "";
  req.body.map((item) => {
    qry += `insert into product2 set Batch_Days_c="${item.Batch_Daysc}",Batch_Frequencyc="${item.Batch_Frequencyc}",Class_Typec="${item.Class_Typec}",courseuniqueidc="${item.courseuniqueidc}",CreatedById="${item.CreatedById}",CreatedDate="${item.CreatedDate}",Description="${item.Description}",DisplayUrl="${item.DisplayUrl}",ExternalDataSourceId="${item.ExternalDataSourceId}",ExternalId="${item.ExternalId}",Family="${item.Family}",Id="${item.Id}",IsActive="${item.IsActive}",IsArchived="${item.IsArchived}",IsDeleted="${item.IsDeleted}",LastModifiedById="${item.LastModifiedById}",LastModifiedDate="${item.LastModifiedDate}",LastReferencedDate="${item.LastReferencedDate}",LastViewedDate="${item.LastViewedDate}",Levelc="${item.Levelc}",leveluniqueidsc="${item.leveluniqueidsc}",Name="${item.Name}",ProductCode="${item.ProductCode}",QuantityUnitOfMeasure="${item.QuantityUnitOfMeasure}",StockKeepingUnit="${item.StockKeepingUnit}",Sub_levelc="${item.Sub_levelc}",SystemModstamp="${item.SystemModstamp}",Total_No_of_Sessionc="${item.Total_No_of_Sessionc}" on duplicate key update Batch_Days_c="${item.Batch_Daysc}",Batch_Frequencyc="${item.Batch_Frequencyc}",Class_Typec="${item.Class_Typec}",courseuniqueidc="${item.courseuniqueidc}",CreatedById="${item.CreatedById}",CreatedDate="${item.CreatedDate}",Description="${item.Description}",DisplayUrl="${item.DisplayUrl}",ExternalDataSourceId="${item.ExternalDataSourceId}",ExternalId="${item.ExternalId}",Family="${item.Family}",Id="${item.Id}",IsActive="${item.IsActive}",IsArchived="${item.IsArchived}",IsDeleted="${item.IsDeleted}",LastModifiedById="${item.LastModifiedById}",LastModifiedDate="${item.LastModifiedDate}",LastReferencedDate="${item.LastReferencedDate}",LastViewedDate="${item.LastViewedDate}",Levelc="${item.Levelc}",leveluniqueidsc="${item.leveluniqueidsc}",Name="${item.Name}",ProductCode="${item.ProductCode}",QuantityUnitOfMeasure="${item.QuantityUnitOfMeasure}",StockKeepingUnit="${item.StockKeepingUnit}",Sub_levelc="${item.Sub_levelc}",SystemModstamp="${item.SystemModstamp}",Total_No_of_Sessionc="${item.Total_No_of_Sessionc}";`;
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

// / 9/feb
router.post("/showCourses", (req, res) => {
  const final_Arr = [];
  // console.log("showCourses===with==level=", req.body);

  var l_aa = [];
  l_aa.push(req.body.level);
  // console.log("l_aa==================35===", l_aa);
  let l_level = l_aa[0].split(";");
  var final_level = l_level[l_level.length - 1]; // Extract last position Level
  // console.log("final_level==============38===", final_level);

  var requestOptions = {
    method: "POST",
  };

  // console.log("377777777777777777777777777777777777777");

  let ApiBeforLogIn_Result = fetch(
    /// Fetch-AccessToken Api.....
    `${SF_Access_Token.SF_Access_Token}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((resultttt) => {
      /// Salesforce Log In Api..
      // console.log("ACCESS TOKEN-------- 42", resultttt.access_token);
      fetch(
        ///// Fetch Product Api.....
        // `https://upstepacademy.my.salesforce.com//services/data/v51.0/query/?q=Select+Id,IsActive,Batch_Frequency__c ,Class_Type_c,Countryc,Curriculum_Codec,Description,Family,Name,Levelc,Total_No_of_Sessionc,Total_No_of_Sub_Level_c+from+Product2`,
        `https://upstepacademy.my.salesforce.com//services/data/v51.0/query/?q=Select+Id,IsActive,Batch_Frequency__c ,Class_Type__c,Country__c,Duration__c,Curriculum_Code__c,Description,Family,Name,Level__c,Total_No_of_Session__c,Total_No_of_Sub_Level__c+from+Product2`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${resultttt.access_token}`,
          },
        }
      )
        .then((responsee) => responsee.json())
        .then((AllProductsResult) => {
          // console.log(
          //   "AllProductsResult============recordsss======56",
          //   AllProductsResult.records
          // );

          if (AllProductsResult.records.length != 0) {
            // console.log("inn iffffffffff 60");
            fetch(
              /// Price book entry Api
              // `https://upstepacademy.my.salesforce.com//services/data/v51.0/query/?q=Select+Id,Name,UnitPrice,Pricebook2.Name,Product2.Name,Pricebook2.Country__c,IsActive+from+PricebookEntry+where +Pricebook2.Country__c=+'${req.body.country}'`,

              // `https://upstepacademy.my.salesforce.com//services/data/v51.0/query/?q=Select+Id,Name,UnitPrice,Pricebook2.Name,Product2.Name,Product2.Id,Pricebook2.Country__c,IsActive+from+PricebookEntry+where +Pricebook2.Country__c=+'${req.body.country}'`,

              `https://upstepacademy.my.salesforce.com//services/data/v51.0/query/?q=Select+Id,Name,UnitPrice,Pricebook2.Name,Product2.Name,Product2.Id,Pricebook2.Country__c,CurrencyIsoCode,IsActive+from+PricebookEntry+where +Pricebook2.Country__c=+'${req.body.country}'`,
              {
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${resultttt.access_token}`,
                },
              }
            )
              .then((resss) => resss.json())
              .then((PriceBookEntryResult) => {
                // console.log(
                //   "Price Book Entry ID-------- ",
                //   PriceBookEntryResult.records
                // );
                var tempP = PriceBookEntryResult.records.filter((itemm) => {
                  AllProductsResult.records.map((iitt) => {
                    if (
                      itemm.Product2.Id === iitt.Id &&
                      iitt.Level__c == final_level
                    ) {
                      var tempObj = {
                        Class_Type__c: iitt.Name,
                        Level: iitt.Level__c,
                        // Level: iitt.Eligibility__c,
                        duration: iitt.Duration__c,
                        Price: itemm.UnitPrice,
                        id: iitt.Id,
                        pBe_id: itemm.Id,
                        currency_code: itemm.CurrencyIsoCode,
                      };
                      // console.log("tempObj==============117=", tempObj);

                      // console.log("tempP==============107", itemm.CurrencyIsoCode);
                      final_Arr.push(tempObj);
                    }
                  });
                });
                return res.status(200).json({
                  status: true,
                  newArr: final_Arr,
                });
              });
          } else {
            return res.status(200).json({
              status: true,
              message: "Record Null",
              newArr: AllProductsResult.records,
            });
          }
        })
        .catch((error) => {
          // console.log("in catch=======================122");
          return res
            .status(400)
            .json({ status: false, message: "Error Occurred", error });
        });
    });
});

router.post("/CourseSubmittion", (req, res) => {
  // console.log("Req.body==CourseSubmittion>>>>", req.body);

  var { accountId, courseId, PbEntry_Id, duration } = req.body;
  pool.query(
    "insert into cart(student_id,course_id,pricebookentry_id,duration__c) values(?,?,?,?)",
    [accountId, courseId, PbEntry_Id, duration],
    function (err, result) {
      if (err) {
        // console.log("err", err);

        res.status(400).json({ status: false, data: result });
      } else {
        // console.log("result", result);

        res.status(200).json({ status: true, data: result });
      }
    }
  );
});

module.exports = router;
