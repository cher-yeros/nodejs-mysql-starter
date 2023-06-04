const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");
const Course = require("./Course");
const User = require("./User");

const Rating = connection.define(
  "Rating",
  {
    stars: { type: DataTypes.INTEGER, allowNull: false },
  },
  { timestamps: true }
);
Course.hasMany(Rating, { foreignKey: "courseId" });
User.hasMany(Rating, { foreignKey: "userId" });
module.exports = Rating;
