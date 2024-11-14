'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "localidade_local",
      [
        {
          quantidade: 5, 
          local_id: 1,
          localidade_id: 1,         
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          quantidade: 10,
          local_id: 2,
          localidade_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          quantidade: 10,
          local_id: 3,
          localidade_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        // Adicione mais objetos de localidade_local conforme necessário
      ],
      {}
    );
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("localidade_local", null, {});
  }
  
};
