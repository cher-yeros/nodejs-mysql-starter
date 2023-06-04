const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");
const Course = require("./Course");
const User = require("./User");

const WatchStatus = connection.define(
  "WatchStatus",
  {
    minsWatched: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  { timestamps: true }
);
Course.hasMany(WatchStatus, { foreignKey: "courseId" });
User.hasMany(WatchStatus, { foreignKey: "userId" });

module.exports = WatchStatus;
