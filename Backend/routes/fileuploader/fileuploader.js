'use strict';
const express = require("express");
const router = express.Router();
const { upload } = require("../../helpers/filehelper");
const SingleFile = require("../../models/fileuploader/singleFile");
const { singleFileUpload, multipleFileUpload,
    getallSingleFiles, getallMultipleFiles, downloadFile, downloadPDFFile, getallMultipleFilesByID }
    = require("../../controllers/authentication/fileuploader/fileuploader");

// const EmployeeController = require("../../controllers/authentication/EmployeeController");

// router.get("/", upload.single('file'), EmployeeController.index);
// router.post("/show", EmployeeController.show);
// router.post("/store", upload.array('files'), EmployeeController.store);
// router.post("/update", EmployeeController.update);
// router.post("/delete", EmployeeController.destroy);


router.post("/singleFile", upload.single('file'), singleFileUpload);
router.post("/multipleFiles", upload.array('files'), multipleFileUpload);
router.get("/getSingleFiles", getallSingleFiles);
router.get("/getMultipleFiles", getallMultipleFiles);
router.get("/getMultipleFiles/:id", getallMultipleFilesByID);
// router.get("/downloadFile/:id", downloadFile);
router.get("/downloadPDFFile/:id", downloadPDFFile);

// router.route("/singleFile").post((req, res) => {
//     upload.single('file');
//     singleFileUpload();
// })
//new
// router.get("/downloadFilePikod", downloadFilePikod);


module.exports = router;