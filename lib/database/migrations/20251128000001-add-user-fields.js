'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.ENUM('admin', 'agent', 'customer'),
      allowNull: false,
      defaultValue: 'customer'
    });
    
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: true // Allow null initially for existing users
    });
    
    await queryInterface.addColumn('Users', 'isActive', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'role');
    await queryInterface.removeColumn('Users', 'password');
    await queryInterface.removeColumn('Users', 'isActive');
  }
};
