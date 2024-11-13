const Sequelize = require("sequelize");
const connection = require("../database/connection");
const { validaSenha, validaEmail } = require("../libs/validators");
const Localidades = require("./Localidades");
const UsuarioLocalidade= require("./UsuarioLocalidade");

const Usuarios = connection.define(
  "usuario",
  {
    nome_completo: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 30],
          msg: "O nome deve ter entre 3 e 30 caracteres",
        },
      },
    },
    endereco: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sexo: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    cpf: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [11, 11],
          msg: "O CPF deve ter 11 caracteres",
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        validaEmail,
      },
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        validaSenha,
      },
    },
    data_nascimento: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: "A data de nascimento deve ser uma data válida",
        },
      },
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "ativo",
      validate: {
        isIn: {
          args: [["ativo", "inativo"]],
          msg: "O status deve ser ativo ou inativo",
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

Localidades.belongsToMany(Usuarios, { through: UsuarioLocalidade });
Usuarios.belongsToMany(Localidades, { through: UsuarioLocalidade });

Usuarios.hasMany(UsuarioLocalidade);
Localidades.hasMany(UsuarioLocalidade);

UsuarioLocalidade.belongsTo(Usuarios);
UsuarioLocalidade.belongsTo(Localidades);

module.exports = Usuarios;
