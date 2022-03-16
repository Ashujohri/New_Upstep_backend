var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
const pool = require("./apiConfig/pool");
var multer = require("./apiConfig/multer");
const { getUser } = require("./getUser");
var secretConfig = require("../config/secrete.json");
var SF_Access_Token = require("../config/secrete.json");

router.post("/ChangePassword", function (req, res, next) {
  var requestOptions = {
    method: "POST",
  };
  let body = [
    {
      email: req.body[0].email,
      studentPassword: req.body[0].newPass,
    },
  ];

  let ApiBeforLogIn_Result = fetch(
    `${SF_Access_Token.SF_Access_Token}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      // console.log("27----- in change pass", result.access_token);
      fetch(
        // `https://upstepacademy--dev2.my.salesforce.com/services/apexrest/v1/studentserviceAPI`,
        `https://upstepacademy.my.salesforce.com/services/apexrest/v1/studentserviceAPI`,
        {
          body: JSON.stringify(body),
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${result.access_token}`,
          },
        }
      )
        .then((finalResult) => finalResult.json())
        .then((final_Resultt) => {
          // console.log("41 in Change PAssword ------ ", final_Resultt);
          return res.status(200).json({ status: true, final_Resultt });
        });
    })
    .catch((error) => {
      return res.status(400).json({ status: false, error });
    });
});

router.post("/StudentDisplay", (req, res) => {
  // console.log("req.body", req.body);
  var qry = `SELECT * FROM account where Id='${req.body.id}'`;
  pool.query(qry, (err, result) => {
    if (err) {
      // console.log("errorrrr====StudentDisplay", err);
      return res.status(400).json([]);
    } else {
      console.log("resulttt======StudentDisplay", result);
      return res
        .status(200)
        .json({ status: true, message: "Records found", result: result });
    }
  });
});

router.post(
  "/UpdateStudent",
  multer.single("Photo"),
  function (req, res, next) {
    // console.log("Request body of Lead API", req.body);
    // console.log("Request DOT FILE", req.file);
    var requestOptions = {
      method: "POST",
    };
    var body = [];

    var AccessTokenResult = fetch(
      `${SF_Access_Token.SF_Access_Token}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(async (result) => {
        // var splitPath = req.file.path.split("s\\")[1];

        // console.log("Access Token Result", result, JSON.stringify(req.body));

        // console.log("req.file.filename==81", req.file.filename);

        // if(req.file.filename)
        // console.log("req.body.Photo=====86==86", req.body);
        if (req.body.Photo == "") {
          // console.log("in the iF condition========88");
          var body1 = [
            {
              // Referred_Code__c

              email: req.body.email,
              lastname: req.body.lastname,
              firstname: req.body.firstname,
              Phone: req.body.Phone,
              // PhotoUrl: `http://localhost:3333/images/${splitPath}`,
              // PhotoUrl: `http://campusshala.com:3333/images/${splitPath}`,
            },
          ];
        } else {
          // console.log("in the else condition========102");
          var splitPath = req.file.path.split("s\\")[1];

          var body1 = [
            {
              // Referred_Code__c

              email: req.body.email,
              lastname: req.body.lastname,
              firstname: req.body.firstname,
              Phone: req.body.Phone,
              PhotoUrl: `${secretConfig.ServerUrl}/images/${splitPath}`,
            },
          ];
        }
        // console.log("BODYYYYYYY 111111111111111===117", body1);
        var requestOptions2 = {
          method: "POST",
          headers: {
            "Content-type": "application/json;charset=utf-8",
            Authorization: `Bearer ${result.access_token}`,
          },
          body: JSON.stringify(body1),
        };
        // console.log("requestOptions2.body=====", requestOptions2.body);
        var re = await fetch(
          // `https://upstepacademy--dev2.my.salesforce.com/services/apexrest/v1/studentserviceAPI`,
          `https://upstepacademy.my.salesforce.com/services/apexrest/v1/studentserviceAPI`,
          requestOptions2
        );
        var response = await re.json();
        console.log("RESPONSE OF UPDATE", response);
        console.log("RESPONSE OF UPDATE STATUS", response.status);
        return res.status(200).json({ response });
      })
      .catch((error) => {
        // console.log("Access Token Error", error);
        return res
          .status(400)
          .json({ status: false, message: "Error occurred" });
      });
  }
);

module.exports = router;
