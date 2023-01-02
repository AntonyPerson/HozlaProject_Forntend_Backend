/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const router = require("express").Router();
const HozlaRequest = require("../models/hozlaRequest.model");
const { upload } = require("../helpers/filehelper");
const MultipleFile = require("../models/fileuploader/multipleFile");
// const referenceId = 1;

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

router.route("/getCountStatus").get((req, res) => {
  let received = 0;
  let inWorking = 0;
  let inprint = 0;
  let readyForTakeIn = 0;
  // let archive = 0;
  HozlaRequest.find()
    .then((request) =>
      //  res.json(request)
      {
        request.map((hozla) => {
          if (hozla.status === 25) {
            received += 1;
          } else if (hozla.status === 50) {
            inWorking += 1;
          } else if (hozla.status === 75) {
            inprint += 1;
          } else if (hozla.status === 100) {
            readyForTakeIn += 1;
          }
          // else if (hozla.status === 125) {
          //   archive += 1;
          // }
        });
        // console.log(`received: ${received}`);
        // console.log(`inprint: ${inprint}`);
        // console.log(`ended: ${ended}`);
        // console.log(`readyForTakeIn: ${readyForTakeIn}`);
        // console.log(`archive: ${archive}`);
      }
    )
    .then(() => res.json({ received, inWorking, inprint, readyForTakeIn }))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const typeRequest = req.body.typeRequest;
  const user_card_number = req.body.user_card_number;
  const forTypePrint = req.body.forTypePrint;
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
  const fullNameTakein = req.body.fullNameTakein;
  const workRecivedDate = Date.parse(req.body.workRecivedDate);
  const files_id = req.body.files_id;
  const status = req.body.status;
  const personalnumber = req.body.personalnumber;
  const clientNote = String(req.body.clientNote);
  const toraHeilitVolumes = req.body.toraHeilitVolumes;
  const propPrints = req.body.propPrints;

  const newHozlaRequest = new HozlaRequest({
    typeRequest,
    user_card_number,
    forTypePrint,
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
    fullNameTakein,
    workRecivedDate,
    files_id,
    status,
    personalnumber,
    clientNote,
    toraHeilitVolumes,
    propPrints,
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
      request.typeRequest = req.body.typeRequest;
      request.user_card_number = req.body.user_card_number;
      request.forTypePrint = req.body.forTypePrint;
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
      request.fullNameTakein = req.body.fullNameTakein;
      request.workRecivedDate = Date.parse(req.body.workRecivedDate);
      request.files_id = req.body.files_id;
      request.clientNote = String(req.body.clientNote);
      request.status = req.body.status;
      request.toraHeilitVolumes = req.body.toraHeilitVolumes;
      request.personalnumber = req.body.personalnumber;
      request.propPrints = req.body.propPrints;

      request
        .save()
        .then(() => res.json("HozlaRequest updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/updateNameReciver/:id").post((req, res) => {
  HozlaRequest.findById(req.params.id)
    .then((request) => {
      request.fullNameReciver = req.body.fullNameReciver;
      request
        .save()
        .then(() => res.json("HozlaRequest updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/sameRequest/:id").get((req, res) => {
  const getDaysDiff = (dateToCheck) => {
    const day = new Date().getDate();
    const mounth = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const currentDate = Date.parse(`${year}-${mounth}-${day}`);

    // console.log(dateToCheck);
    // console.log(`${year}-${mounth}-${day}`);
    // console.log(currentDate);
    // console.log(Date.parse(dateToCheck));
    const diff =
      Math.abs(currentDate - Date.parse(dateToCheck)) / (1000 * 3600 * 24);
    // console.log(diff);
    return diff;
  };
  // let message = "";
  // var unit = "";
  HozlaRequest.findById(req.params.id)
    .then((request) => {
      const unitName = request.unit;
      const dataToraHeilit = request.toraHeilitVolumes;
      const day = request.workGivenDate.getDate();
      const mounth = request.workGivenDate.getMonth() + 1;
      const year = request.workGivenDate.getFullYear();
      const dateSent = Date.parse(`${year}-${mounth}-${day}`);

      let message = false;
      // console.log(unitName);
      // console.log(dataToraHeilit);
      HozlaRequest.find({ unit: unitName, toraHeilitVolumes: dataToraHeilit })
        .then((requestData) => {
          requestData.map((tora) => {
            const day = tora.workGivenDate.getDate();
            const mounth = tora.workGivenDate.getMonth() + 1;
            const year = tora.workGivenDate.getFullYear();
            const dateTora = Date.parse(`${year}-${mounth}-${day}`);
            const diff =
              Math.abs(dateSent - Date.parse(tora.workGivenDate)) /
              (1000 * 3600 * 24);
            if (
              // tora.toraHeilitVolumes === dataToraHeilit &&
              tora.id !== req.params.id &&
              dateTora <= dateSent &&
              diff <= 365
            ) {
              console.log("Same Data");
              console.log(diff);
              // unit = tora.unit;
              message = true;
            }
          });
          console.log(dateSent);

          {
            message === true
              ? res.json({ message: "בקשה זו כבר נשלחה בשנה האחרונה" })
              : res.json({ message: "" });
          }
          // console.log(`received: ${received}`);
          // console.log(`inprint: ${inprint}`);
          // console.log(`ended: ${ended}`);
          // console.log(`readyForTakeIn: ${readyForTakeIn}`);
          // console.log(`archive: ${archive}`);
        })
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
        request.files_id = "";
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
