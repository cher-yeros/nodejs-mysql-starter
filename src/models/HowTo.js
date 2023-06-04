const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");
const Category = require("./Category");

const HowTo = connection.define(
  "HowTo",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);
Category.hasOne(HowTo, { foreignKey: "categoryId" });
module.exports = HowTo;
