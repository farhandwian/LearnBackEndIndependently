const Sequelize = require("sequelize");

module.exports = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  usernames: {
    type: Sequelize.String(35),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.String(35),
    allowNull: false,
  },
});
