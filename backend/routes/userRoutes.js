const express = require("express");
const router = express.Router();
// get routes from controller
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controller/userController");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", getMe);

module.exports = router;
