const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  signout,
} = require("../../controllers/authentication/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);

router.get("/passportauth", async (req, res) => {
  try {
    res.send({
      stam: req.user,
      familyName: req.user.name.familyName || req.user._json.cn,
      firstName: req.user.name.givenName || req.user._json.cn,
    });
  } catch (err) {
    res.send({
      stam: req.user,
      familyName: req.user.name.familyName || req.user._json.cn,
      firstName: req.user.name.givenName || req.user._json.cn,
    });
  }
});

module.exports = router;
