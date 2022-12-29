/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */

const router = require("express").Router();
const { request } = require("express");
const toraHeilit = require("../models/toraHeilit.model");

router.route("/").get((req, res) => {
  toraHeilit
    .findOne()
    // .sort({ status: 1, createdAt: -1 })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  //   const user_card_number = req.body.user_card_number;
  //   const numPages = req.body.numPages;
  const toraHeilitVolumes = req.body.toraHeilitVolumes;

  const newtoraHeilit = new toraHeilit({
    // user_card_number,
    toraHeilitVolumes,
  });
  const formId = newtoraHeilit.save((err, form) => {
    if (err) {
      return res.status(400).json("Error: " + err);
    } else {
      res.send(form.id);
    }
  });
});

router.route("/:id").get((req, res) => {
  toraHeilit
    .findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").delete((req, res) => {
  toraHeilit
    .findOneAndDelete()
    .then(() => res.json("toraHeilitVolumes deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/:hozlaRequestID").get((req, res) => {
//     toraHeilit.find({ hozlaRequestID: req.params.hozlaRequestID })
//     .exec()
//     .then((request) => res.json(request))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

router.route("/update/:id").post((req, res) => {
  toraHeilit
    .findById(req.params.id)
    .then((request) => {
      request.user_card_number = req.body.user_card_number;
      request.order_maker_card_number = req.body.order_maker_card_number;

      request.toraHeilitVolumes = req.body.toraHeilitVolumes;
      request
        .save()
        .then(() => res.json("toraHeilitVolumes updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/update").post((req, res) => {
  toraHeilit
    .findOne()
    .then((request) => {
      request.user_card_number = req.body.user_card_number;
      request.order_maker_card_number = req.body.order_maker_card_number;

      request.toraHeilitVolumes = req.body.toraHeilitVolumes;
      request
        .save()
        .then(() => res.json("toraHeilitVolumes updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
