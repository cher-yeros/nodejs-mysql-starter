const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");

const Role = connection.define(
  "Role",
  {
    // erp: { type: DataTypes.STRING, allowNull: false, defaultValue: "mefm" },
    // key: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Role;
