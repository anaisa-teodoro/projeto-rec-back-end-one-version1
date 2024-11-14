'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "usuario",
      [
        {
          nome_completo: 'Java',
          sexo: 'Feminino',
          cpf: '123456729',
          email: 'devz@dev.com',
          senha: 'DevFuturo@25',
          endereco: 'Rua porta 3333',
          status: 'ativo',
          data_nascimento: '2023-12-20',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome_completo: 'Java2',
          sexo: 'Feminino',
          cpf: '123456788',
          email: 'deva@dev.com',
          senha: 'DevFuturo@26',
          endereco: 'Rua porta 3334',
          status: 'ativo',
          data_nascimento: '2023-12-23',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome_completo: 'Java3',
          sexo: 'Feminino',
          cpf: '1234561288',
          email: 'devi@dev.com',
          senha: 'DevFuturo@16',
          endereco: 'Rua porta 1234',
          status: 'ativo',
          data_nascimento: '2023-12-22',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("usuario", null, {});
  }
};