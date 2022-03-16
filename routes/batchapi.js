var express = require("express");
var router = express.Router();
var pool = require("./apiConfig/pool");

router.post("/CurrentBatch", function (req, res, next) {
  var qry = " ";

  req.body.map((item) => {
    qry += `insert into batch__c set Available_Students_in_batch__c="${item.Available_Students_in_batch__c}", Batch_id__c="${item.Batch_id__c}", Batch_Size__c="${item.Batch_Size__c}", Batch_Status__c="${item.Batch_Status__c}", Batch_Time__c="${item.Batch_Time__c}", Check__c="${item.Check__c}", Class_Type__c="${item.Class_Type__c}", Coach__c="${item.Coach__c}", Country_of_Batch_Student__c="${item.Country_of_Batch_Student__c}", Course__c="${item.Course__c}", CreatedById="${item.CreatedById}", CreatedDate="${item.CreatedDate}", Current_No_of_Enrollments__c="${item.Current_No_of_Enrollments__c}", Days__c="${item.Days__c}", Email__c="${item.Email__c}", End_Date__c="${item.End_Date__c}", Id="${item.Id}", IsDeleted="${item.IsDeleted}", LastModifiedById="${item.LastModifiedById}",LastModifiedDate="${item.LastModifiedDate}", LastReferencedDate="${item.LastReferencedDate}", LastViewedDate="${item.LastViewedDate}", Level_Starting__c="${item.Level_Starting__c}", Name="${item.Name}", OwnerId="${item.OwnerId}", Relationship_Manager__c="${item.Relationship_Manager__c}", Start_Date__c="${item.Start_Date__c}", Sub_Level_Starting__c="${item.Sub_Level_Starting__c}", SystemModstamp="${item.SystemModstamp}", Time_Day_of_batch_country__c="${item.Time_Day_of_batch_country__c}", User__c="${item.User__c}", Level__c="${item.Level__c}", Sub_level__c="${item.Sub_level__c}", Next_level__c="${item.Next_level__c}", Next_Level_Start_date__c="${item.Next_Level_Start_date__c}", Next_Level_End_date__c="${item.Next_Level_End_date__c}", Email1__c="${item.Email1__c}", Mobile__c="${item.Mobile__c}" on duplicate key update Available_Students_in_batch__c="${item.Available_Students_in_batch__c}", Batch_id__c="${item.Batch_id__c}", Batch_Size__c="${item.Batch_Size__c}", Batch_Status__c="${item.Batch_Status__c}", Batch_Time__c="${item.Batch_Time__c}", Check__c="${item.Check__c}", Class_Type__c="${item.Class_Type__c}", Coach__c="${item.Coach__c}", Country_of_Batch_Student__c="${item.Country_of_Batch_Student__c}", Course__c="${item.Course__c}", CreatedById="${item.CreatedById}", CreatedDate="${item.CreatedDate}", Current_No_of_Enrollments__c="${item.Current_No_of_Enrollments__c}", Days__c="${item.Days__c}", Email__c="${item.Email__c}", End_Date__c="${item.End_Date__c}", Id="${item.Id}", IsDeleted="${item.IsDeleted}", LastModifiedById="${item.LastModifiedById}",LastModifiedDate="${item.LastModifiedDate}", LastReferencedDate="${item.LastReferencedDate}", LastViewedDate="${item.LastViewedDate}", Level_Starting__c="${item.Level_Starting__c}", Name="${item.Name}", OwnerId="${item.OwnerId}", Relationship_Manager__c="${item.Relationship_Manager__c}", Start_Date__c="${item.Start_Date__c}", Sub_Level_Starting__c="${item.Sub_Level_Starting__c}", SystemModstamp="${item.SystemModstamp}", Time_Day_of_batch_country__c="${item.Time_Day_of_batch_country__c}", User__c="${item.User__c}", Level__c="${item.Level__c}", Sub_level__c="${item.Sub_level__c}", Next_level__c="${item.Next_level__c}", Next_Level_Start_date__c="${item.Next_Level_Start_date__c}", Next_Level_End_date__c="${item.Next_Level_End_date__c}", Email1__c="${item.Email1__c}", Mobile__c="${item.Mobile__c}";`;
  });

  pool.query(qry, function (error, result) {
    if (error) {
      // console.log("Error", error);
      return res
        .status(400)
        .json({ status: false, message: "Server Error...", error });
    } else {
      // console.log("RESULT OF CURRENT BATCH", result);
      return res
        .status(200)
        .json({ status: true, message: "Records Updated..", result });
    }
  });
});

router.post("/CurrentBatchDisplay", function (req, res, next) {
  // console.log("req.bodyy========", req.body);
  var qry = `select B.*, E.Enrollment_Date__c, A.Email__c, A.Phone, A.Relationship_Manager__c, E.Level__c from batch__c as B join enrollment__c as E on B.Id = E.Batch__c join account as A on E.Student__c=A.Id  where A.Id='${req.body.id}' and E.Enrollment_Status__c='Upcoming'`;
  pool.query(qry, function (error, result) {
    if (error) {
      // console.log("Error", error);
      return res
        .status(400)
        .json({ status: false, message: "Error Occurred..." });
    } else {
      console.log("RESULT OF Current_BATCH__C", result);
      return res
        .status(200)
        .json({ status: true, message: "Record Found...", result });
    }
  });
});

router.post("/SessionBatch", function (req, res, next) {
  var qry = " ";
  req.body.map((item) => {
    qry += `insert into session__c set Attendance_Status__c="${item.Attendance_Status__c}", CreatedById="${item.CreatedById}", CreatedDate="${item.CreatedDate}", Date__c="${item.Date__c}", Enrollment__c="${item.Enrollment__c}", Feedback__c="${item.Feedback__c}", Feedback_Status__c="${item.Feedback_Status__c}", Id="${item.Id}", IsDeleted="${item.IsDeleted}", LastModifiedById="${item.LastModifiedById}", LastModifiedDate="${item.LastModifiedDate}", LastReferencedDate="${item.LastReferencedDate}", LastViewedDate="${item.LastViewedDate}", Name="${item.Name}", OwnerId="${item.OwnerId}", SystemModstamp="${item.SystemModstamp}", Topic__c="${item.Topic__c}", Batch_Local_Time__c="${item.Batch_Local_Time__c}", Class_Points__c="${item.Class_Points__c}", Status__c="${item.Status__c}", Link__c="${item.Link__c}", Class_Duration__c="${item.Class_Duration__c}", Timezone__c="${item.Timezone__c}", Homework_available__c="${item.Homework_available__c}", Homework_feedback__c="${item.Homework_feedback__c}", Homework_PDF_Code_Name__c="${item.Homework_PDF_Code_Name__c}", Homework_URL__c="${item.Homework_URL__c}", HW_rating__c="${item.HW_rating__c}", Is_completed__c="${item.Is_completed__c}", Uploaded_HW__c="${item.Uploaded_HW__c}", Homework_Description__c="${item.Homework_Description__c}", Homework_Deadline__c="${item.Homework_Deadline__c}", Homework_Title__c="${item.Homework_Title__c}", Session_Date__c="${item.Session_Date__c}", Session_Status__c="${item.Session_Status__c}", Session_Type__c="${item.Session_Type__c}", Zoom_link1__c="${item.Zoom_link1__c}", Level__c="${item.Level__c}",Meeting_Id__c="${item.Meeting_Id__c}", Time__c="${item.Time__c}" on duplicate key update Attendance_Status__c="${item.Attendance_Status__c}", CreatedById="${item.CreatedById}", CreatedDate="${item.CreatedDate}", Date__c="${item.Date__c}", Enrollment__c="${item.Enrollment__c}", Feedback__c="${item.Feedback__c}", Feedback_Status__c="${item.Feedback_Status__c}", Id="${item.Id}", IsDeleted="${item.IsDeleted}", LastModifiedById="${item.LastModifiedById}", LastModifiedDate="${item.LastModifiedDate}", LastReferencedDate="${item.LastReferencedDate}", LastViewedDate="${item.LastViewedDate}", Name="${item.Name}", OwnerId="${item.OwnerId}", SystemModstamp="${item.SystemModstamp}", Topic__c="${item.Topic__c}", Batch_Local_Time__c="${item.Batch_Local_Time__c}", Class_Points__c="${item.Class_Points__c}", Status__c="${item.Status__c}", Link__c="${item.Link__c}", Class_Duration__c="${item.Class_Duration__c}", Timezone__c="${item.Timezone__c}", Homework_available__c="${item.Homework_available__c}", Homework_feedback__c="${item.Homework_feedback__c}", Homework_PDF_Code_Name__c="${item.Homework_PDF_Code_Name__c}", Homework_URL__c="${item.Homework_URL__c}", HW_rating__c="${item.HW_rating__c}", Is_completed__c="${item.Is_completed__c}", Uploaded_HW__c="${item.Uploaded_HW__c}", Homework_Description__c="${item.Homework_Description__c}", Homework_Deadline__c="${item.Homework_Deadline__c}", Homework_Title__c="${item.Homework_Title__c}", Session_Date__c="${item.Session_Date__c}", Session_Status__c="${item.Session_Status__c}", Session_Type__c="${item.Session_Type__c}", Zoom_link1__c="${item.Zoom_link1__c}", Level__c="${item.Level__c}",Meeting_Id__c="${item.Meeting_Id__c}", Time__c="${item.Time__c}";`;
  });
  pool.query(qry, function (error, result) {
    if (error) {
      // console.log("ERRORRRRR", error);
      return res
        .status(400)
        .json({ status: false, message: "Error Occurred.. ", error });
    } else {
      // console.log("RESULT OF SESSION ", result);
      return res
        .status(200)
        .json({ status: true, message: "Record Save..", result });
    }
  });
});

// 15-Jan-2022

// 15-Jan-2022

// 29-dec

router.post("/BatchViewDisplay", function (req, res, next) {
  // console.log("req.bodyy========BatchViewDisplay", req.body);
  var qry = `select S.*,S.Level__c as 'session_level',E.Batch__c,E.Class_Type__c,E.Level__c,B.Batch_id__c,A.Student_Id__c as 'Student_id' from session__c as S join enrollment__c as E on S.Enrollment__c=E.Id join batch__c as B on E.Batch__c=B.Id join account as A on E.Student__c=A.Id where E.Enrollment_Status__c='Upcoming' and E.Student__c='${req.body.idd}' and S.Session_Status__c in ("Completed","Planned") group by S.Id order by Date__c;`;

  pool.query(qry, function (error, result) {
    if (error) {
      // console.log("Error", error);
      return res
        .status(400)
        .json({ status: false, message: "Error Occurred..." });
    } else {
      // console.log("RESULT OF BatchViewDisplay", result);
      return res
        .status(200)
        .json({ status: true, message: "Record Found...", result });
    }
  });
});

// 9 jan
//

router.post("/PastLevelsDisplay", function (req, res, next) {
  let sql = `CALL getCertificates(?)`;

  pool.query(sql, [req.body.id], function (err, result) {
    if (err) {
      console.log("errRRRRRRRRRRRRRRR:", err);
      return res
        .status(400)
        .json({ status: false, message: "Error Occurred..." });
    } else {
      console.log("sql=========", sql);
      console.log("results:==============getCertificates=======", result);
      console.log("result.length====", result.length);
      return res
        .status(200)
        .json({ status: true, message: "Record Found...", result: result[0] });
    }
  });
});

router.post("/BatchViewDisplayForPlanned", function (req, res, next) {
  console.log("req.bodyy========BatchViewDisplay", req.body);
  var qry = `select S.*,S.Level__c as 'session_level',E.Batch__c,E.Class_Type__c,E.Level__c,B.Batch_id__c,A.Student_Id__c as 'Student_id' from session__c as S join enrollment__c as E on S.Enrollment__c=E.Id join batch__c as B on E.Batch__c=B.Id join account as A on E.Student__c=A.Id where E.Enrollment_Status__c='Upcoming' and E.Student__c='${req.body.idd}' and S.Session_Status__c in ("Planned")  and S.Session_Type__c='Training' group by S.Id order by Date__c asc limit 1 ;`;

  pool.query(qry, function (error, result) {
    if (error) {
      // console.log("Error", error);
      return res
        .status(400)
        .json({ status: false, message: "Error Occurred..." });
    } else {
      console.log("RESULT OF BatchViewDisplay Planned", result);
      return res
        .status(200)
        .json({ status: true, message: "Record Found...", result });
    }
  });
});

module.exports = router;
