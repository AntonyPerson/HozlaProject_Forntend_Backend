const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:personalnumber").get((req, res) => {
  User.findOne({ personalnumber: req.params.personalnumber })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const personalnumber = req.body.personalnumber;
  const firstName = req.body.firstName;
  const lastLame = req.body.lastLame;

  const newUser = new User({ personalnumber, firstName, lastLame });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
