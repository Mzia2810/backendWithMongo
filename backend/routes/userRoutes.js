const express = require("express");
const router = express.Router();
// get routes from controller
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controller/userController");

const { Protect } = require("../middleware/authMiddleware");


console.log(' is Authorized ? ::: ',Protect)


router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", Protect, getMe);

module.exports = router;
