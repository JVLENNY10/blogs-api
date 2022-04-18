'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.createTable('Users');
  }
};
