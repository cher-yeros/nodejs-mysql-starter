const catchAsyncError = require("../middlewares/catchAsyncError");
const { Category, Course } = require("../models");
const ErrorHandler = require("../utils/errorHandler");

exports.createCategory = async (req, res, next) => {
  const { tag } = req.body;
  if (tag == null) return next(new ErrorHandler("Tag cant be null"));

  const tagFound = await Category.findOne({
    where: {
      tag,
    },
  });
  if (tagFound) return next(new ErrorHandler("Tag is already taken!", 400));

  const category = await Category.create(req.body);
  return res.status(200).send({
    success: true,
    category,
  });
};

exports.getAllCategories = catchAsyncError(async (req, res, next) => {
  const category = await Category.findAll({
    include: [Course],
  });

  res.status(200).json(category);
});
