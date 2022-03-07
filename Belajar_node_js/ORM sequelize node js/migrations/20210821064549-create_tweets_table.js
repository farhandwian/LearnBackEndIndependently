"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("tweets", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: Sequelize.INTEGER(11),
      content: Sequelize.STRING(300),
      createdAt: Sequelize.DATE, //important
      updatedAt: Sequelize.DATE, //important
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tweets");
  },
};
