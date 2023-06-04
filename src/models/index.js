const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");
const Role = require("./Role");
const User = require("./User");
const Category = require("./Category");
const Course = require("./Course");
const Wishlist = require("./Wishlist");
const WatchStatus = require("./WatchStatus");
const Rating = require("./Rating");
const Comment = require("./Comment");
const Payment = require("./Payment");
const CourseMaterial = require("./CourseMaterial");
const Enrollment = require("./Enrollment");
const HowTo = require("./HowTo");
const Report = require("./Report");
const Like = require("./Like");
const Suggestion = require("./Suggestion");
const Excercise = require("./Excercise");
const Quiz = require("./Quiz");
const QuizAnswer = require("./QuizAnswer");
const User_Role = connection.define(
  "User_Role",
  { active: { type: DataTypes.BOOLEAN, defaultValue: true } },
  { timestamps: false }
);
User.belongsToMany(Role, { through: User_Role });
Role.belongsToMany(User, { through: User_Role });
module.exports = {
  User,
  Role,
  User_Role,
  Category,
  Course,
  Wishlist,
  WatchStatus,
  Rating,
  Comment,
  Payment,
  CourseMaterial,
  Enrollment,
  HowTo,
  Report,
  Like,
  Suggestion,
  Excercise,
  Quiz,
  QuizAnswer,
};


switch (process.env.NODE_ENV) {
  case "developement":
    connection.sync();
    break;
  case "MIGRATION":
    connection.sync({ force: true });
    break;
}