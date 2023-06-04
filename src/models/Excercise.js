const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");
const HowTo = require("./HowTo");
const Course = require("./Course");
const User = require("./User");

const Excercise = connection.define(
  "Excercise",
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);
Course.hasMany(Excercise);

module.exports = Excercise;
