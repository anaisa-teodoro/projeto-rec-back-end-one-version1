'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      "locais",
      {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        usuario_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "usuario", key: "id" },
        },
        nome_local: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
        },
        localidade: { type: Sequelize.STRING(20), allowNull: false },
        cep: { type: Sequelize.STRING(20), allowNull: false },
        endereco: { type: Sequelize.STRING(20), allowNull: false },
        latitude: { type: Sequelize.STRING(20), allowNull: true },
        longitude: { type: Sequelize.STRING(20), allowNull: true },
        status: {
          type: Sequelize.STRING(7),
          allowNull: false,
          defaultValue: "ativo",
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

     await queryInterface.dropTable('locais');
     
  }
};
