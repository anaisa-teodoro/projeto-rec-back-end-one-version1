const Sequelize = require("sequelize");
const connection = require("../database/connection");

const Localidades = connection.define(
  "localidades",
  {
    // Campos existentes...
    localidades: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Localidades são obrigatórias",
        },
      },
    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [0, 400],
          msg: "A descrição deve ter até 400 caracteres",
        },
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
  }
);

module.exports = Localidades;




