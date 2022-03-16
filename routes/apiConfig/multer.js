var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    var filename = file.originalname.replace(/[^a-z0-9]/gi, "_.").toLowerCase();
    cb(null, filename);
  },
});
var upload = multer({ storage: storage });

module.exports = upload;
