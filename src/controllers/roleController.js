const catchAsyncError = require("../middlewares/catchAsyncError");
const { Role } = require("../models");

exports.getAllRoles = catchAsyncError(async (req, res, next) => {
  const { erp } = req.params;
  const roles = await Role.findAll({ where: { erp } });

  res.status(200).json(roles);
});
