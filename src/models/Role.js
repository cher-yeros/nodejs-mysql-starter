const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");

const Role = connection.define(
  "Role",
  {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Role;
