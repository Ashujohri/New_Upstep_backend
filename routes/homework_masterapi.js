var express = require("express");
var router = express.Router();
var pool = require("./apiConfig/pool");

router.post("/HomeworkMasterUpstep", function (req, res, next) {
  var qry = "";
  req.body.map((item) => {
    qry += `insert into homework_master__c set CreatedById="${item.CreatedById}", CreatedDate="${item.CreatedDate}", homeids__c="${item.homeids__c}", Homework_Name__c="${item.Homework_Name__c}", Id="${item.Id}", Id_of_Game__c="${item.Id_of_Game__c}", IsDeleted="${item.IsDeleted}", LastModifiedById="${item.LastModifiedById}", LastModifiedDate="${item.LastModifiedDate}", LastReferencedDate="${item.LastReferencedDate}", LastViewedDate="${item.LastViewedDate}", Name="${item.Name}", OwnerId="${item.OwnerId}", Session_Master_Id__c="${item.Session_Master_Id__c}", SystemModstamp="${item.SystemModstamp}" on duplicate key update CreatedById="${item.CreatedById}", CreatedDate="${item.CreatedDate}", homeids__c="${item.homeids__c}", Homework_Name__c="${item.Homework_Name__c}", Id="${item.Id}", Id_of_Game__c="${item.Id_of_Game__c}", IsDeleted="${item.IsDeleted}", LastModifiedById="${item.LastModifiedById}", LastModifiedDate="${item.LastModifiedDate}", LastReferencedDate="${item.LastReferencedDate}", LastViewedDate="${item.LastViewedDate}", Name="${item.Name}", OwnerId="${item.OwnerId}", Session_Master_Id__c="${item.Session_Master_Id__c}", SystemModstamp="${item.SystemModstamp}";`;
  });
  pool.query(qry, function (error, result) {
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: "Server Error...", error });
    } else {
      return res
        .status(200)
        .json({ status: true, message: "Record Save", result });
    }
  });
});

module.exports = router;
