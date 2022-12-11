/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */

const router = require("express").Router();
const { request } = require("express");
const AnnualInfoAdmin = require("../models/AnnualInfoAdmin.model");

router.route("/").get((req, res) => {
  AnnualInfoAdmin.findOne()
    .sort({ status: 1, createdAt: -1 })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const user_card_number = req.body.user_card_number;
  // const numPages = req.body.numPages;
  const sumRequestInYear = req.body.sumRequestInYear;
  const sumBeatsBlackwhite = req.body.sumBeatsBlackwhite;

  const numBeatsColourful = req.body.numBeatsColourful;
  const countPrintInYear = req.body.countPrintInYear;
  const unit = req.body.unit;
  const anaf = req.body.anaf;
  const mador = req.body.mador;
  const status = req.body.status;

  // // numBeatsColourful: 0,
  // sumBeatsBlackwhite: 0,
  // sumRequestInYear: 0,

  const newAnnualInfoAdmin = new AnnualInfoAdmin({
    user_card_number,
    sumBeatsBlackwhite,
    sumRequestInYear,
    // numPages,
    numBeatsColourful,
    countPrintInYear,
    unit,
    anaf,
    mador,
    status,
  });
  const formId = newAnnualInfoAdmin.save((err, form) => {
    if (err) {
      return res.status(400).json("Error: " + err);
    } else {
      res.send(form.id);
    }
  });
});

router.route("/:id").get((req, res) => {
  AnnualInfoAdmin.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  AnnualInfoAdmin.findByIdAndDelete(req.params.id)
    .then(() => res.json("AnnualInfoAdmin deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:hozlaRequestID").get((req, res) => {
  AnnualInfoAdmin.find({ hozlaRequestID: req.params.hozlaRequestID })
    .exec()
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  AnnualInfoAdmin.findById(req.params.id)
    .then((request) => {
      request.user_card_number = req.body.user_card_number;
      request.unit = req.body.unit;
      request.anaf = req.body.anaf;
      request.mador = req.body.mador;

      request.status = req.body.status;
      request.order_maker_card_number = req.body.order_maker_card_number;

      // admin
      // request.numPages = req.body.numPages;

      request.sumRequestInYear = req.body.sumRequestInYear;
      request.sumBeatsBlackwhite = req.body.sumBeatsBlackwhite;

      request.numBeatsColourful = req.body.numBeatsColourful;
      request.countPrintInYear = req.body.countPrintInYear;

      request
        .save()
        .then(() => res.json("AnnualInfoAdmin updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/update").post((req, res) => {
  AnnualInfoAdmin.findOne()
    .then((request) => {
      request.user_card_number = req.body.user_card_number;
      request.unit = req.body.unit;
      request.anaf = req.body.anaf;
      request.mador = req.body.mador;

      request.status = req.body.status;
      request.order_maker_card_number = req.body.order_maker_card_number;

      // admin
      // request.numPages = req.body.numPages;

      request.sumRequestInYear = req.body.sumRequestInYear;
      request.sumBeatsBlackwhite = req.body.sumBeatsBlackwhite;

      request.numBeatsColourful = req.body.numBeatsColourful;
      request.countPrintInYear = req.body.countPrintInYear;

      request
        .save()
        .then(() => res.json("AnnualInfoAdmin updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
