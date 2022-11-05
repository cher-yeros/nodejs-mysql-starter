const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");

const Vendor = connection.define(
  "Vendor",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Vendor;
