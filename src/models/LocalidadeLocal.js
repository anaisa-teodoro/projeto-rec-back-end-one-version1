const Sequelize = require("sequelize");
const connection = require("../database/connection");

const LocalidadeLocal= connection.define(
  "localidade_local",
  {
    quantidade: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
  }
);

module.exports = LocalidadeLocal;