var express = require("express");
const pool = require("./apiConfig/pool");
var router = express.Router();
const { getUser } = require("./getUser");

router.post("/LoginApi", getUser, function (req, res, next) {});

///// 15 March
router.post("/tokenForDate", function (req, res, next) {
  console.log("re.body", req.body);

  pool.query(
    `select *, MAX(created_time) as Max_Time, MAX(created_date) as Last_Date from token where user_id='${req.body.Id}'`,
    (err, result) => {
      if (err) {
        console.log("ERROR in token 16 ", err);
        return res.status(400).json([]);
      } else {
        console.log("Result of token", result);
        return res
          .status(200)
          .json({ status: true, message: "Token Result", result });
      }
    }
  );
});

module.exports = router;
