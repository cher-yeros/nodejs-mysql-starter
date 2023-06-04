const express = require("express");
const {
  loginUser,
  registerUser,
  logout,
  checkUsername,
} = require("../controllers/authController");
const { getAllRoles } = require("../controllers/roleController");
const {
  addProfileImage,
  getAllUsers,
} = require("../controllers/users_controller");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = express.Router();

router.get("/getAllUsers", getAllUsers);
// router.post("/avatar/:userId", addProfileImage);

module.exports = router;
