var express = require("express");
var router = express.Router();
var pool = require("./apiConfig/pool");

router.get("/FAQ", function (req, res, next) {
    var qry = `select * from faq`;
    pool.query(qry, function(error, result){
        if(error){
            // console.log("Errorrrrrrrrrr", error);
            return res.status(400).json({status: false, message: "Error Occurred..." });
        }else{
            // console.log("FAQ RESULT", result);
            return res.status(200).json({status: true, message: "Result Found....", result });
        }
    });
});

router.get("/ShowLead", function (req, res, next) {
    var qry = `select * from refrees;`;
    pool.query(qry, function (error, result) {
      if (error) {
        console.log("Error of Show Lead", error);
        return res
          .status(400)
          .json({ status: false, message: "Error Occur", error });
      } else {
        console.log("Result of Show Lead", result);
        return res
          .status(200)
          .json({ status: true, message: "Record Found", result });
      }
    });
  });

module.exports = router;