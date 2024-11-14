'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "localidade",
      [
        {
          nome_localidade: "Localidade 10",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome_localidade: "Localidade 5",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome_localidade: "Localidade 6",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("localidade", null, {});
  }

};