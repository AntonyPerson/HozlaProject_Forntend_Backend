const express = require("express");
const router = express.Router();

const {
  find,
  getuserbyid,
  getuserbypersonalnumber,
  update,
  remove,
  usersbyrole,
} = require("../../controllers/authentication/user");

router.post("/getuserbyid", getuserbyid);

router.post("/getuserbypersonalnumber", getuserbypersonalnumber);

router.get("/users", find);

router.put("/user/update/:id", update);

router.post("/user/remove/:userId", remove);

router.get("/usersbyrole/:role", usersbyrole);

module.exports = router;
