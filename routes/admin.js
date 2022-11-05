const express = require("express");
const {
  loginUser,
  registerUser,
  logout,
  checkUsername,
} = require("../controllers/authController");
const { getAllRoles } = require("../controllers/roleController");
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addPrivilege,
  deletePrivilege,
} = require("../controllers/users_controller");
const { isAuthenticatedUser, onlyAdmin } = require("../middlewares/auth");
const router = express.Router();

router.get("/users/:erp", [isAuthenticatedUser, onlyAdmin], getAllUsers);
router.get("/user/:id", getSingleUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

router.post("/privilege/:username/:roleKey", addPrivilege);
router.delete("/privilege/:username/:roleKey", deletePrivilege);

module.exports = router;
