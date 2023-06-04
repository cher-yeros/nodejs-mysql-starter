const express = require("express");
const { getAllCategories } = require("../controllers/category_controller");
const {
  addCourse,
  getAllCourses,
  addCourseVideo,
  getCourseById,
} = require("../controllers/course_controller ");
const { addProfileImage } = require("../controllers/users_controller");
const router = express.Router();

router.post("/avatar/:userId", addProfileImage);
router.get("/course/:courseId", getCourseById);
router.post("/addCourse", addCourse);
router.get("/getAllCourses", getAllCourses);
router.get("/getAllCategories", getAllCategories);
router.post("/addCourseVideo", addCourseVideo);

module.exports = router;
