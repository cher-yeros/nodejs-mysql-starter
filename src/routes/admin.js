const express = require("express");
const {
  loginUser,
  logout,
  checkUsername,
  registerUser,
} = require("../controllers/authController");
const { createCategory } = require("../controllers/category_controller");
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

router.get("/getAllUsers", getAllUsers);
router.get("/getUser/:id", getSingleUser);
router.put("/updateUser/:id", updateUser);
router.post("/createCategory", createCategory);
// router.post("/addUser", addUser);
// router.post("/registerUser", registerUser);
// router.get("/users/:erp", [isAuthenticatedUser, onlyAdmin], getAllUsers);
// router.post("/privilege/:username/:roleKey", addPrivilege);
// router.delete("/user/:id", deleteUser);

// router.delete("/privilege/:username/:roleKey", deletePrivilege);

module.exports = router;
