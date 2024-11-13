const Sequelize = require("sequelize");
const connection = require("../database/connection");


const UsuarioLocalidade= connection.define(
    "usuario_localidade",
    {
        usuario_id: {
            type: Sequelize.INTEGER,
        },
        localidade_id: {
            type: Sequelize.INTEGER,
        },
    },
    {
        paranoid: true,
        underscored: true,
    }
);

module.exports = UsuarioLocalidade;