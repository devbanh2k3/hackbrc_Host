'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('allaccounts', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      key: {
        type: Sequelize.STRING
      },
      machinename: {
        type: Sequelize.STRING
      },
      serialnumber: {
        type: Sequelize.STRING
      },
      profilename: {
        type: Sequelize.STRING
      },
      checkbm: {
        type: Sequelize.BOOLEAN
      },
      birthday: {
        type: Sequelize.STRING
      },
      uid: {
        type: Sequelize.STRING
      },
      countaccount: {
        type: Sequelize.STRING
      },
      Ideal: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      pickdate: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      ip: {
        type: Sequelize.STRING
      },
      update: {
        type: Sequelize.TINYINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('allaccounts');
  }
};