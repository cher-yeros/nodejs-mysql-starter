const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");
const HowTo = require("./HowTo");
const User = require("./User");

const Like = connection.define(
  "Like",
  {
    like: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  { timestamps: true }
);
User.hasMany(Like);
HowTo.hasMany(Like);

module.exports = Like;
