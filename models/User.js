const Sequelize = require("sequelize");
const dbConnection = require("../dbConnection/dbConnection");

const User = dbConnection.define(
  "user",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      reallowNullquired: false
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Date.now
    }
  },
  {
    freezeTableName: true
  }
);

module.exports = User;
