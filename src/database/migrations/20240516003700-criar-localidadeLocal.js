'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'localidade_local',
      {
        quantidade: { type: Sequelize.INTEGER, allowNull: false },
        local_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'locais', key: 'id' },
        },
        local_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'local', key: 'id' },
        },
        localidade_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'localidade', key: 'id' },
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },

      {
        paranoid: true,
        underscored: true,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('localidade_local');
  },
};
