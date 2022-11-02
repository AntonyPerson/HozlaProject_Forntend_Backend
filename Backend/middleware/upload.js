const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
    const extaion = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
  // fileFilter: (req, file, cb) => {
  //   if (file.mimetype == "application/pdf") {
  //     cb(null, true);
  //   } else {
  //     console.log("Only PDF file can be uploaded");
  //     cb(null, false);
  //   }
  // },
  //   limits: {
  //     fileSize: 1024 * 1024 * 1024  * 5,
  //   },
});

module.exports = upload;

// 1 Kilobyte (KB) = 1,024 bytes
// 1 Megabyte (MB) = 1,024 KB
// 1 Gigabyte (GB) = 1,024 MB
// 1 Terabyte (TB) = 1,024 GB
//1024 * 1024 * 1024  * 5 === 5GB
