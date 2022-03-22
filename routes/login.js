var express = require("express");
const pool = require("./apiConfig/pool");
var router = express.Router();
const { getUser } = require("./getUser");

router.post("/LoginApi", getUser, function (req, res, next) {});

///// 15 March
router.post("/tokenForDate", function (req, res, next) {
  console.log("re.body", req.body);

  pool.query(
    // `select *, MAX(created_time) as Max_Time, MAX(created_date) as Last_Date from token where
    `select * from campussh_upstep.token where user_id='${req.body.Id}' group by created_date, created_time asc`,
    (err, result) => {
      if (err) {
        console.log("ERROR in token 16 ", err);
        return res.status(400).json([]);
      } else {
        console.log("Result of token", result);
        // fruits[fruits.length-2]
        let final_Data = result[result.length - 2];
        console.log("final_Data==23===========", final_Data);

        return res
          .status(200)
          .json({ status: true, message: "Token Result", result: final_Data });
      }
    }
  );
});

module.exports = router;
