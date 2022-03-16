// // var LocalStorage = require("node-localstorage").LocalStorage;
// // localStorage = new LocalStorage("/scratch");
// // var st_id = localStorage.getItem("studentId");

// var multer = require("multer");
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/homework_files");
//   },
//   filename: function (req, file, cb) {
//     let dateee = new Date().valueOf();
//     let final_name = st_id + dateee + file.originalname;
//     var filename = final_name.replace(/[^a-z0-9]/gi, "_.").toLowerCase();
//     // console.log("final_name========23232323232323", filename);
//     cb(null, filename);
//   },
// });
// var upload = multer({ storage: storage });

// module.exports = upload;
