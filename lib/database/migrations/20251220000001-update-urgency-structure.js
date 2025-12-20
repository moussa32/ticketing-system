"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Step 1: Rename table from Urgencies to urgency
    await queryInterface.renameTable("Urgencies", "urgency");

    // Step 2: Rename id column to urgency_id
    await queryInterface.renameColumn("urgency", "id", "urgency_id");

    // Step 3: Rename name column to urgency_name and change type
    await queryInterface.renameColumn("urgency", "name", "urgency_name");
    await queryInterface.changeColumn("urgency", "urgency_name", {
      type: Sequelize.STRING(100),
      allowNull: false,
    });

    // Step 4: Add duration column
    await queryInterface.addColumn("urgency", "duration", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, // Temporary default for existing rows
    });
  },

  async down(queryInterface, Sequelize) {
    // Reverse the changes
    await queryInterface.removeColumn("urgency", "duration");

    await queryInterface.changeColumn("urgency", "urgency_name", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.renameColumn("urgency", "urgency_name", "name");

    await queryInterface.renameColumn("urgency", "urgency_id", "id");

    await queryInterface.renameTable("urgency", "Urgencies");
  },
};
