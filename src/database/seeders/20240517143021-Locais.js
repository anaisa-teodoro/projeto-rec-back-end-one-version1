'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "locais",
      [
        {
          usuario_id: 1,
          nome_local: "Local 1",
          localidade: "São Paulo",
          cep: "12345-678",
          endereco: "Rua Exemplo, 123",
          latitude: "-27.6019",
          longitude: "-48.4703",
          status: "ativo",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          usuario_id: 2,
          nome_local: "Local 2",
          localidade: "São Paulo2",
          cep: "12345-679",
          endereco: "Rua Exemplo 2, 123",
          latitude: "-27.6018",
          longitude: "-48.4705",
          status: "ativo",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          usuario_id: 3,
          nome_local: "Local 3",
          localidade: "São Paulo 3",
          cep: "12345-676",
          endereco: "Rua Exemplo, 124",
          latitude: "-27.6015",
          longitude: "-48.4703",
          status: "ativo",
          created_at: new Date(),
          updated_at: new Date(),
        }
      ],
      {}

    );

  },

  async down(queryInterface, Sequelize) {

  }
};