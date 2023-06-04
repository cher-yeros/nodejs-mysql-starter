const { v4: uuidv4 } = require("uuid");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const {
  User,
  Role,
  User_Role,
  Course,
  Category,
  CourseMaterial,
} = require("../models");
const _ = require("lodash");

exports.addCourse = async (req, res, next) => {
  const { title, categoryId } = req.body;
  if (title == null) return next(new ErrorHandler("title can not be null"));
  if (categoryId == null)
    return next(new ErrorHandler("categoryId can not be null"));
  const course = await Course.create(req.body);
  return res.status(200).send({ success: true, course });
};

exports.getAllCourses = catchAsyncError(async (req, res, next) => {
  const course = await Course.findAll({
    include: [Category],
  });

  res.status(200).json(course);
});
exports.getCourseById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const course = await Course.findOne({ id: id });
  res.status(200).json(course);
});

exports.addCourseVideo = catchAsyncError(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorHandler("Please upload a Video !", 400));
  }

  const { userId } = req.body;
  console.log(req.files);
  let fileName =
    Date.now() + uuidv4() + "." + req.files.file.mimetype.split("/")[1];

  req.files.file.mv("public/courseVideos/" + fileName, function (err) {
    if (err) {
      return next(new ErrorHandler("Unable to upload the video!", 400));
    }
  });

  const result = await CourseMaterial.create({
    dir: fileName,
    title: req.body.title,
    courseId: req.body.courseId,
    type: req.body.type,
  });

  return res.status(200).json({
    success: !!result[0],
    avatar: fileName,
  });
});
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const roles = await User.findAll();

  res.status(200).json(roles);
});
exports.updateUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  // console.log(req.body);
  const updated = await User.update(req.body, {
    where: {
      id: id,
    },
  });
  res.status(200).json(updated);
});

exports.addPrivilege = catchAsyncError(async (req, res, next) => {
  const { username, roleKey } = req.params;

  const role = await Role.findOne({ where: { key: roleKey } });
  const user = await User.findOne({ where: { id: username }, include: [Role] });

  var alreadyThere = false;

  for (const userRole of user.Roles) {
    if (userRole.key === role.key) {
      alreadyThere = true;
      break;
    } else {
      alreadyThere = false;
    }
  }

  if (alreadyThere) {
    return next(new ErrorHandler("You have already given the privilage!", 400));
  }

  await user.addRole(role, { through: { selfGranted: false } });
  res.status(200).json({ success: true });
});

exports.deletePrivilege = catchAsyncError(async (req, res, next) => {
  const { username, roleKey } = req.params;

  const role = await Role.findOne({ where: { key: roleKey } });
  const user = await User.findOne({ where: { id: username }, include: [Role] });

  var alreadyThere = false;

  for (const userRole of user.Roles) {
    if (userRole.key === role.key) {
      alreadyThere = true;
      break;
    } else {
      alreadyThere = false;
    }
  }

  if (!alreadyThere) {
    return next(
      new ErrorHandler(
        "You haven't given the privilage, at the first place!",
        400
      )
    );
  }

  if (user.Roles.length <= 1)
    return next(new ErrorHandler("There must be at least one role!", 400));

  const userRole = await user.removeRole(role);

  res.status(200).json({ success: true });
});
