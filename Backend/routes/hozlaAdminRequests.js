/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */

const router = require("express").Router();
const { request } = require("express");
const HozlaAdminRequest = require("../models/hozlaAdminRequest.model");

router.route("/").get((req, res) => {
  HozlaAdminRequest.find()
    .sort({ status: 1, createdAt: -1 })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getAnafPrintCount").get((req, res) => {
  let tun = 0;
  let takom = 0;
  let tom = 0;
  let sadot = 0;
  let aczaka = 0;
  let segel = 0;
  let peer = 0;
  let ergon = 0;
  let shalishot = 0;
  let other = 0;
  HozlaAdminRequest.find()
    .then((request) => {
      request.map((hozla) => {
        if (hozla.anaf === `תו"ן` || hozla.anaf === `תון`) {
          tun = hozla.numPages + tun;
        } else if (hozla.anaf === `תקום` || hozla.anaf === `תקו"ם`) {
          takom = hozla.numPages + takom;
        } else if (hozla.anaf === `תום` || hozla.anaf === `תו"ם`) {
          tom = hozla.numPages + tom;
        } else if (hozla.anaf === `שדות` || hozla.anaf === `שדו"ת`) {
          sadot = hozla.numPages + sadot;
        } else if (hozla.anaf === `אחזקה`) {
          aczaka = hozla.numPages + aczaka;
        } else if (hozla.anaf === `סגל`) {
          segel = hozla.numPages + segel;
        } else if (hozla.anaf === `פאר` || hozla.anaf === `פא"ר`) {
          peer = hozla.numPages + peer;
        } else if (hozla.anaf === `ארגון`) {
          ergon = hozla.numPages + ergon;
        } else if (hozla.anaf === `שלישות`) {
          shalishot = hozla.numPages + shalishot;
        } else {
          other = hozla.numPages + other;
        }
      });
      console.log(`tun: ${tun}`);
      console.log(`takom: ${takom}`);
      console.log(`tom: ${tom}`);
      console.log(`sadot: ${sadot}`);
      console.log(`aczaka: ${aczaka}`);
      console.log(`segel: ${segel}`);
      console.log(`peer: ${peer}`);
      console.log(`ergon: ${ergon}`);
      console.log(`shalishot: ${shalishot}`);
      console.log(`other: ${other}`);
    })
    .then(() =>
      res.json({
        tun,
        takom,
        tom,
        sadot,
        aczaka,
        segel,
        peer,
        ergon,
        shalishot,
        other,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const user_card_number = req.body.user_card_number;
  // const unit = req.body.unit;
  //
  // const mador = req.body.mador;
  // const phoneNumber = req.body.phoneNumber;
  // const workName = req.body.workName;
  // const workClearance = req.body.workClearance;
  // const bindingType = req.body.bindingType;
  // const bindingTypeOther = req.body.bindingTypeOther;
  // const copyType = req.body.copyType;
  // const pageType = req.body.pageType;
  // const numOfCopyies = Number(req.body.numOfCopyies);
  // const fullNameAsker = req.body.fullNameAsker;
  // const workGivenDate = Date.parse(req.body.workGivenDate);
  // const fullNameReciver = req.body.fullNameReciver;
  // const workRecivedDate = Date.parse(req.body.workRecivedDate);
  // const files = req.body.files;
  // const status = req.body.status;
  // const order_maker_card_number = req.body.order_maker_card_number;

  // admin
  const hozlaRequestID = req.body.hozlaRequestID;
  const anaf = req.body.anaf;
  const sumColourfulPages = req.body.sumColourfulPages;
  const sumNoColourfulPages = req.body.sumNoColourfulPages;
  const numPages = req.body.numPages;
  const numColourfulBeats = req.body.numColourfulBeats;
  const numNoColourfulBeats = req.body.numNoColourfulBeats;
  const selected = req.body.selected;
  const selectedBW = req.body.selectedBW;
  const twoSides = req.body.twoSides;

  const newHozlaAdminRequest = new HozlaAdminRequest({
    user_card_number,
    //   unit,

    //   mador,
    //   phoneNumber,
    //   workName,
    //   workClearance,
    //   bindingType,
    //   bindingTypeOther,
    //   copyType,
    //   pageType,
    //   numOfCopyies,
    //   fullNameAsker,
    //   workGivenDate,
    //   fullNameReciver,
    //   workRecivedDate,
    //   files,
    // status,
    // order_maker_card_number,

    // admin
    hozlaRequestID,
    anaf,
    sumColourfulPages,
    sumNoColourfulPages,
    numPages,
    numColourfulBeats,
    numNoColourfulBeats,
    selected,
    selectedBW,
    twoSides,
  });
  const formId = newHozlaAdminRequest.save((err, form) => {
    if (err) {
      return res.status(400).json("Error: " + err);
    } else {
      res.send(form.id);
    }
  });
});

router.route("/:id").get((req, res) => {
  HozlaAdminRequest.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  HozlaAdminRequest.findByIdAndDelete(req.params.id)
    .then(() => res.json("HozlaRequest deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:hozlaRequestID").get((req, res) => {
  HozlaAdminRequest.find({ hozlaRequestID: req.params.hozlaRequestID })
    .exec()
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  HozlaAdminRequest.findById(req.params.id)
    .then((request) => {
      request.user_card_number = req.body.user_card_number;
      // request.unit = req.body.unit;

      // request.mador = req.body.mador;
      // request.phoneNumber = req.body.phoneNumber;
      // request.workName = req.body.workName;
      // request.workClearance = req.body.workClearance;
      // request.bindingType = req.body.bindingType;
      // request.bindingTypeOther = req.body.bindingTypeOther;
      // request.copyType = req.body.copyType;
      // request.pageType = req.body.pageType;
      // request.numOfCopyies = Number(req.body.numOfCopyies);
      // request.fullNameAsker = req.body.fullNameAsker;
      // request.workGivenDate = Date.parse(req.body.workGivenDate);
      // request.fullNameReciver = req.body.fullNameReciver;
      // request.workRecivedDate = Date.parse(req.body.workRecivedDate);
      // request.files = req.body.files;
      request.anaf = req.body.anaf;
      request.status = req.body.status;
      request.order_maker_card_number = req.body.order_maker_card_number;

      // admin
      request.sumColourfulPages = req.body.sumColourfulPages;
      request.sumNoColourfulPages = req.body.sumNoColourfulPages;
      request.numPages = req.body.numPages;
      request.numColourfulBeats = req.body.numColourfulBeats;
      request.numNoColourfulBeats = req.body.numNoColourfulBeats;
      request.selected = req.body.selected;
      request.selectedBW = req.body.selectedBW;
      request.twoSides = req.body.twoSides;

      request
        .save()
        .then(() => res.json("HozlaRequest updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
