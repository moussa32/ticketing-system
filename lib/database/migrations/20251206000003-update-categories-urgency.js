'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove priority column
    // Remove priority column
    try {
        await queryInterface.removeColumn('Categories', 'priority');
    } catch (e) {
        console.log("Priority column likely does not exist, skipping removal");
    }
    
    // Add urgencyId column
    await queryInterface.addColumn('Categories', 'urgencyId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Allow null initially or if category has no urgency
      references: {
        model: 'Urgencies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove urgencyId column
    await queryInterface.removeColumn('Categories', 'urgencyId');
    
    // Add priority column back
    await queryInterface.addColumn('Categories', 'priority', {
      type: Sequelize.ENUM('low', 'medium', 'high'),
      allowNull: false,
      defaultValue: 'low'
    });
  }
};
