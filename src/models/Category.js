const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");

const Category = connection.define(
  "Category",
  {
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Category;
