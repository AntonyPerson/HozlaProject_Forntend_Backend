"use strict";
const SingleFile = require("../../models/fileuploader/singleFile");
const MultipleFile = require("../../models/fileuploader/multiplefile");
//new
// const Pikod = require("../../models/units/pikod");
// const Assessment = require("../../models/assessment/assessment");

//moves the $file to $dir2
var moveFile = (file, dir2, newName) => {
  //include the fs, path modules
  var fs = require("fs");
  var path = require("path");

  //gets file name and adds it to dir2
  var f = newName + path.extname(file);
  var dest = path.resolve(dir2, f);

  if (!fs.existsSync(dir2)) fs.mkdirSync(dir2);
  fs.rename(file, dest, (err) => {
    if (err) throw err;
    else console.log("Successfully moved");
  });
};

const singleFileUpload = async (req, res, next) => {
  if (req.file) {
    const path = require("path");
    const fs = require("fs");
    const ext = path.extname(req.file.path);
    try {
      fs.readdirSync("./uploads/" + req.body.collection).forEach((file) => {
        if (file.startsWith(req.body.id)) {
          console.log("File exists! moving to archive");
          moveFile(
            "./uploads/" +
            req.body.collection +
            "/" +
            req.body.id +
            path.extname(file),
            "./uploads/archive/" + req.body.collection,
            req.body.id + "#" + Math.random() * (100000000000000 - 0) + 0
          );
        }
      });
    } catch (err) {
      console.error(err);
    }
    try {
      const file = new SingleFile({
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        collec: req.body.collection,
        listing_id: req.body.id,
        fileSize: fileSizeFormatter(req.file.size, 2), // 0.00
      });
      await file.save();
      moveFile(
        "./" + file.filePath,
        "./uploads/" + req.body.collection,
        req.body.id
      );
      res.status(201).send("File Uploaded Successfully");
    } catch (error) {
      res.status(400).send(error.message);
    }
    // console.log("1")
    // console.log(req.body)
    // console.log("2")
    // console.log(req.file)
  }
  else{
    res.status(201).send("לא נשלח קובץ - הקובץ לא נשמר");
  }
};

const multipleFileUpload = async (req, res, next) => {
  try {
    let filesArray = [];
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        filePath: element.path,
        fileType: element.mimetype,
        fileSize: fileSizeFormatter(element.size, 2),
      };
      filesArray.push(file);
    });
    const multipleFiles = new MultipleFile({
      files: filesArray,
      collec: req.body.collection,
      item_id: req.body.item_id,
    });
    await multipleFiles.save();
    res.status(201).send("Files Uploaded Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getallSingleFiles = async (req, res, next) => {
  try {
    const files = await SingleFile.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getallMultipleFiles = async (req, res, next) => {
  try {
    const files = await MultipleFile.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

const downloadFile = async (req, res, next) => {
  const col = req.query.collec;
  const id = req.query.id;
  const folder = "uploads/" + col;
  const fs = require("fs");
  var path = require("path");
  var ext;
  fs.readdirSync(folder).forEach((file) => {
    if (file.startsWith(id)) {
      ext = path.extname(file);
    }
  });
  try {
    res.download("uploads/" + col + "/" + id + ext);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// const downloadFilePikod = async (req, res, next) => {
//   const col = req.query.collec;
//   const id = req.query.id;
//   const folder = "uploads/" + col;
//   const fs = require("fs");
//   var path = require("path");
//   var ext;

//   let tempstr = "הערכת מצב"

//   let assessment = await Assessment.findOne().where({ _id: id })
//   if (!assessment || !assessment.pikod) {

//   }
//   else {
//     let pikod = await Pikod.findOne().where({ _id: assessment.pikod })
//     if (!pikod) {

//     }
//     else {
//       tempstr += " " + pikod.name;
//     }
//   }

//   fs.readdirSync(folder).forEach((file) => {
//     if (file.startsWith(id)) {
//       ext = path.extname(file);
//     }
//   });
//   try {
//     //download + rename
//     res.download("uploads/" + col + "/" + id + ext, tempstr + ext);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

module.exports = {
  singleFileUpload,
  multipleFileUpload,
  getallSingleFiles,
  getallMultipleFiles,
  downloadFile,
  //
  // downloadFilePikod
};
