'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      "usuario_localidade",
      {
        usuario_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "usuario", key: "id" },
        },
        localidade_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "localidade", key: "id" },
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
    await queryInterface.dropTable("usuario_localidade");
  },
};
