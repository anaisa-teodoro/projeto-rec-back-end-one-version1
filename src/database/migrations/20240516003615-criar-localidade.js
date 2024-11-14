'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable( "localidade",
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nome_localidade: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      }, 
      
        nome_localidade:{
          type: Sequelize.STRING(20),
          allowNull: false,      
        },
         
      descricao: {
        type: Sequelize.STRING(100),
        allowNull: false,
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
    await queryInterface.dropTable("localidade");
  }
};
