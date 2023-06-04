const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");
const Course = require("./Course");

const CourseMaterial = connection.define(
  "CourseMaterial",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dir: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);
Course.hasMany(CourseMaterial, { foreignKey: "courseId" });

module.exports = CourseMaterial;
