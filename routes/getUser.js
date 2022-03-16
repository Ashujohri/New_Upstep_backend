const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const config = require("../config/secrete.json");
var useragent = require("useragent");
const pool = require("./apiConfig/pool");
var SF_Access_Token = require("../config/secrete.json");
useragent(true);

const getUser = (req, res, next) => {
  console.log("getUser====");
  const { secret } = config;
  var accountData;

  var agent = useragent.parse(req.headers["user-agent"]);
  let userDeviceId = agent.toString();

  var responseDate;
  var responseTime;
  //to get Time for JWT Structure
  function getCreatedTime() {
    let d = new Date();
    let hh = d.getHours();
    let minute = d.getMinutes();
    let ss = d.getSeconds();

    if (hh < 10) {
      hh = "0" + hh;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (ss < 10) {
      ss = "0" + ss;
    }

    let finalTime = `${hh}:${minute}:${ss}`;
    responseTime = finalTime;
    return finalTime;
  }

  //to get Date for JWT Structure
  function getCreatedDate() {
    let d = new Date();
    let dd = d.getDate();
    let newdd = dd;
    let mm = d.getMonth() + 1;
    var yyyy = d.getFullYear();
    if (newdd < 10) {
      newdd = "0" + newdd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    let finalDate = newdd + "-" + mm + "-" + yyyy;
    responseDate = finalDate;
    return finalDate;
  }

  var requestOptions = {
    method: "POST",
  };

  let ApiBeforLogIn_Result = fetch(
    `${SF_Access_Token.SF_Access_Token}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      /// Salesforce Log In Api..
      console.log(
        "ACCESS TOKEN-------- 70",
        result.access_token,
        req.body.email
      );
      fetch(
        // `https://upstepacademy--dev2.my.salesforce.com/services/data/v52.0/query/?q=select+id,email__c,Student_Passowrd__c+from+Account+where+email__c=+'${req.body.email}'`,
        `https://upstepacademy.my.salesforce.com/services/data/v52.0/query/?q=select+id,email__c,Student_Passowrd__c+from+Account+where+email__c=+'${req.body.email}' `,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${result.access_token}`,
          },
        }
      )
        .then((finalResult) => finalResult.json())
        .then((final_Resultt) => {
          if (final_Resultt.totalSize != 0) {
            console.log("final_Resultt=======84======>", final_Resultt);
            ///Token....

            let payload = {
              UserID: final_Resultt.records[0].Id,
              DeviceId: userDeviceId,
              CreatedTime: getCreatedTime(),
              CreatedDate: getCreatedDate(),
            };

            // console.log("Payload=======", payload);
            // console.log("secret=======", secret);

            console.log("Payload=======", payload);

            let token_node = jwt.sign(payload, secret);
            console.log("Token>>>>>>=========================", token_node);

            console.log("final_Resultt===>>>", final_Resultt, token_node);

            /// Token Sent to DB
            if (
              final_Resultt.records[0].Id &&
              (token_node != null ||
                token_node != undefined ||
                token_node != "")
            ) {
              pool.query(
                "insert into token (token_id,user_id,created_date,created_time) values(?,?,?,?)",
                [
                  token_node,
                  final_Resultt.records[0].Id,
                  payload.CreatedDate,
                  payload.CreatedTime,
                ],
                (err, rrslt) => {
                  if (err) {
                    console.log("125 error", err);
                    return res.status(400).json([]);
                  }
                }
              );
            }
            pool.query(
              `select * from account where Id='${final_Resultt.records[0].Id}'`,
              (errr, acountresult) => {
                if (errr) {
                  console.log("ERROR in ACCoUNT 135 ", errr);
                  return res.status(400).json([]);
                } else {
                  console.log("134=============", acountresult);
                  return res.status(200).json({
                    status: true,
                    final_Resultt,
                    token: token_node,
                    acountresult,
                  });
                }
              }
            );
          } else {
            // console.log("EMAIL DOESN't EXIST.....");
            return res.status(200).json({
              status: false,
              message: "This Email doesn't exist",
              final_Resultt,
            });
          }
        });
    })
    .catch((error) => console.log("error", error));
};

module.exports = { getUser };
