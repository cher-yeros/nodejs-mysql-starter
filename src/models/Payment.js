const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");

const Payment = connection.define(
  "Payment",
  {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Payment;
