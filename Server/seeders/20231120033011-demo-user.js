'use strict';

const { hashPassword } = require('../utils/bycrpt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await hashPassword('123456');
    return queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
