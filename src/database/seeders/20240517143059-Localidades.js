'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "usuario_localidade",
      [
        {
          usuario_id: 1,
          localidade_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          usuario_id: 1,
          localidade_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          usuario_id: 2,
          localidade_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },

      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("usuario_localidade", null, {});
  
  }
};
