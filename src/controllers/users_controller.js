const { v4: uuidv4 } = require("uuid");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const { User, Role, User_Role } = require("../models");
const _ = require("lodash");

// exports.getAllUsers = catchAsyncError(async (req, res, next) => {
//   // const { erp } = req.params;
//   const { erp } = req.user;
//   console.log(erp);
//   // console.log(req.user.firstname);
//   const users = await User.findAll({
//     where: { erp },
//     include: [Role],
//   });

//   res.status(200).json(users);
// });

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  // const { erp } = req.params;
  // const { erp } = req.user;
  console.log(req.body);
  // console.log(req.user.firstname);
  const users = await User.findAll({
    include: [Role],
  });

  res.status(200).json(users);
});

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const user = await User.findOne({ id: id });
  res.status(200).json(user);
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

exports.addProfileImage = catchAsyncError(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorHandler("Please upload a profile picture!", 400));
  }

  const { userId } = req.params;

  let fileName =
    Date.now() + uuidv4() + "." + req.files.photo.mimetype.split("/")[1];

  req.files.photo.mv("public/avatars/" + fileName, function (err) {
    if (err) {
      return next(new ErrorHandler("Unable to upload the photo!", 400));
    }
  });

  const result = await User.update(
    { avatar: fileName },
    { where: { id: userId } }
  );

  return res.status(200).json({
    success: !!result[0],
    avatar: fileName,
  });
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
