"use strict";
const express = require("express");
const router = express.Router();
const { upload } = require("../../helpers/filehelper");
const {
  singleFileUpload,
  multipleFileUpload,
  getallSingleFiles,
  getallMultipleFiles,
  downloadFile,
//   downloadFilePikod,
} = require("../../controllers/fileuploader100/fileuploader");

router.post("/singleFile", upload.single("file"), singleFileUpload);
router.post("/multipleFiles", upload.array("files"), multipleFileUpload);
router.get("/getSingleFiles", getallSingleFiles);
router.get("/getMultipleFiles", getallMultipleFiles);
router.get("/downloadFile", downloadFile);
//new
// router.get('/downloadFilePikod', downloadFilePikod);

module.exports = router;
