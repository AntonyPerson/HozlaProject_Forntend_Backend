"use strict";
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("3")
    // console.log(req.body); //nothing
    // console.log("4")
    console.log(file);
    cb(null, "uploads/");
    // cb(null, 'uploads/' + req.body.collection +'/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    // || file.mimetype === "application/msword"
    //     || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    // || file.mimetype === 'application/vnd.rar'
    //     || file.mimetype === 'application/zip'
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/vnd.ms-excel" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype === "application/vnd.ms-powerpoint" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    file.mimetype === "application/msword" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    // || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    //     || file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    // || file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.template'
    // || file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.slideshow'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

module.exports = { upload };
