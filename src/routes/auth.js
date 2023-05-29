const express = require("express");
const {
  loginUser,
  registerUser,
  logout,
  checkUsername,
  loggedUser,
  loginStep1,
  loginStep2,
  createPassword,
} = require("../controllers/authController");
const { getAllRoles } = require("../controllers/roleController");
const { isAuthenticatedUser, onlyAdmin } = require("../middlewares/auth");
const router = express.Router();

router.post("/login", loginUser);
router.get("/current-user", [isAuthenticatedUser], loggedUser);
router.post("/register", [onlyAdmin], registerUser);
router.post("/logout", logout);
router.get("/roles/:erp", getAllRoles);

module.exports = router;
