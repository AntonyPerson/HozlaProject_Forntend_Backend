/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */

const router = require("express").Router();
const HozlaAdminRequest = require("../models/hozlaAdminRequest.model");

router.route("/").get((req, res) => {
    HozlaAdminRequest.find()
        .sort({ status: 1, createdAt: -1 })
        .then((request) => res.json(request))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const user_card_number = req.body.user_card_number;
    // const unit = req.body.unit;
    // const anaf = req.body.anaf;
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
    const status = req.body.status;
    const order_maker_card_number = req.body.order_maker_card_number;

    // admin
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
        //   anaf,
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
        status,
        order_maker_card_number,

        // admin
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

router.route("/update/:id").post((req, res) => {
    HozlaAdminRequest.findById(req.params.id)
        .then((request) => {
            request.user_card_number = req.body.user_card_number;
            // request.unit = req.body.unit;
            // request.anaf = req.body.anaf;
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
