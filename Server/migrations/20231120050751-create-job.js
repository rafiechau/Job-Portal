'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      EmployerID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      Company: {
        type: Sequelize.STRING
      },
      Judul: {
        type: Sequelize.STRING
      },
      Deskripsi: {
        type: Sequelize.TEXT
      },
      Lokasi: {
        type: Sequelize.STRING
      },
      TipePekerjaan: {
        type: Sequelize.STRING
      },
      Gaji: {
        type: Sequelize.STRING
      },
      Kategori: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jobs');
  }
};