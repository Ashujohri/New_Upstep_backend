var express = require("express");
var router = express.Router();
var pool = require("./apiConfig/pool");
const fetch = require("node-fetch");

const Razorpay = require("razorpay");

router.post("/addCartItem", function (req, res, next) {
  // console.log("addddddddd=====>", req.body);
  pool.query(
    `insert into cart set student_id='${req.body.stu_id}', course_id='${req.body.crs_id}' `,
    (err, result) => {
      if (err) {
        return res.status(400).json([]);
      } else {
        // console.log("req.bodyyyy", req.body);
        // console.log("resulttt======cart", result);
        return res
          .status(200)
          .json({ message: "Cart item added", result: result });
      }
    }
  );
});

router.post("/showCart", (req, res) => {
  // console.log("showCart====", req.body);
  pool.query(
    `select * from cart where student_id='${req.body.accId}' and pricebookentry_id='${req.body.P_Id}';
    `,
    (err, result) => {
      if (err) {
        // console.log("errorrrr", err);
        return res.status(400).json();
      } else {
        // console.log("resultt", result);
        return res.status(200).json({ status: true, result });
      }
    }
  );
});

///

router.post("/razorFetch", async (req, res) => {
  console.log("req.body==========46", req.body);
  try {
    var instance = new Razorpay({
      // key_id: "rzp_test_DDK8PhJ3ClCxNR",

      // key_secret: "nsUgPdReB45248DkZwtsIhJY",
      key_id: "rzp_live_dtFj0ogwPx8Gc9",

      key_secret: "CvAnrGDYq1An96wq1rOI4nXi",
    });

    const responsee = await instance.paymentLink.create(req.body);
    // responsee
    //   .then((stufff) => stufff.json())
    //   .then((final_stuf) => {
    //     console.log("final_stuff==55", final_stuf);
    //   });
    // console.log("responseeeeeeeeeeeeeeeeeeeeee56", responsee);
    return res.json({ status: true, responsee });
  } catch (e) {
    // console.log("eeeeeeeeeeeeeee", e);
  }
});

////

router.post("/DataToSf", function (req, res, next) {
  console.log("DataToSf=====>", req.body);

  fetch(
    `https://upstepacademy.my.salesforce.com/services/data/v54.0/sobjects/Payment_No__c/${req.body.Id}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${req.body.token}`,
      },
      body: JSON.stringify({
        Order_Id__c: req.body.Order_Id__c,
        Short_URL__c: req.body.Short_URL__c,
        Payment_Mode__c: "Online Payment",
      }),
      method: "PATCH",
    }
  );
});
module.exports = router;
