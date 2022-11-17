/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const router = require("express").Router();
const HozlaRequest = require("../models/hozlaRequest.model");

router.route("/").get((req, res) => {
  HozlaRequest.find()
    .sort({ status: 1, createdAt: -1 })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/activeRequests").get((req, res) => {
  HozlaRequest.find({ status: { $lte: 100 } })
    .sort({ status: 1, createdAt: -1 })
    .exec()
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/archivedRequests").get((req, res) => {
  HozlaRequest.find({ status: { $gte: 125 } })
    .sort({ status: 1, createdAt: -1 })
    .exec()
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const user_card_number = req.body.user_card_number;
  const unit = req.body.unit;
  const anaf = req.body.anaf;
  const mador = req.body.mador;
  const phoneNumber = req.body.phoneNumber;
  const workName = req.body.workName;
  const workClearance = req.body.workClearance;
  const bindingType = req.body.bindingType;
  const bindingTypeOther = req.body.bindingTypeOther;
  const copyType = req.body.copyType;
  const pageType = req.body.pageType;
  const numOfCopyies = Number(req.body.numOfCopyies);
  const fullNameAsker = req.body.fullNameAsker;
  const workGivenDate = Date.parse(req.body.workGivenDate);
  const fullNameReciver = req.body.fullNameReciver;
  const workRecivedDate = Date.parse(req.body.workRecivedDate);
  const files = req.body.files;
  const status = req.body.status;
  const personalnumber = req.body.personalnumber;

  const newHozlaRequest = new HozlaRequest({
    user_card_number,
    unit,
    anaf,
    mador,
    phoneNumber,
    workName,
    workClearance,
    bindingType,
    bindingTypeOther,
    copyType,
    pageType,
    numOfCopyies,
    fullNameAsker,
    workGivenDate,
    fullNameReciver,
    workRecivedDate,
    files,
    status,
    personalnumber,
  });
  const formId = newHozlaRequest.save((err, form) => {
    if (err) {
      return res.status(400).json("Error: " + err);
    } else {
      res.send(form.id);
    }
  });
});

router.route("/requestByPersonalnumber/:personalnumber").get((req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  const personalnumber = req.params.personalnumber;
  // const personalnumber = "7654321";
  HozlaRequest.find({ personalnumber: personalnumber })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  HozlaRequest.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  HozlaRequest.findByIdAndDelete(req.params.id)
    .then(() => res.json("HozlaRequest deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  HozlaRequest.findById(req.params.id)
    .then((request) => {
      request.user_card_number = req.body.user_card_number;
      request.unit = req.body.unit;
      request.anaf = req.body.anaf;
      request.mador = req.body.mador;
      request.phoneNumber = req.body.phoneNumber;
      request.workName = req.body.workName;
      request.workClearance = req.body.workClearance;
      request.bindingType = req.body.bindingType;
      request.bindingTypeOther = req.body.bindingTypeOther;
      request.copyType = req.body.copyType;
      request.pageType = req.body.pageType;
      request.numOfCopyies = Number(req.body.numOfCopyies);
      request.fullNameAsker = req.body.fullNameAsker;
      request.workGivenDate = Date.parse(req.body.workGivenDate);
      request.fullNameReciver = req.body.fullNameReciver;
      request.workRecivedDate = Date.parse(req.body.workRecivedDate);
      request.files = req.body.files;
      request.status = req.body.status;
      request.personalnumber = req.body.personalnumber;

      request
        .save()
        .then(() => res.json("HozlaRequest updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/statusUpdate/:id").post((req, res) => {
  // console.groupCollapsed(`handleStatusChange -------- Axios.then`);
  // console.log(req.params.id);

  HozlaRequest.findById(req.params.id)
    .then((request) => {
      // console.log(request.status);
      request.status = Number(req.body.status);
      // console.log(request.status);
      // console.log(req.body.status);
      if (req.body.status >= 125) {
        request.files = [];
      }
      request
        .save()
        .then(() => res.json("HozlaRequest status updated!"))
        .catch((err) => {
          // console.log(err);

          res.status(400).json("Error: " + err);
        });
    })
    .catch((err) => res.status(400).json("Error: " + err));
  console.groupEnd();
});

module.exports = router;
