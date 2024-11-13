const {config} = require('dotenv');
config();

module.exports = {
    dialect: process.env.DIALECT, //Inserir o banco de dados que está utilizando (mysql, postgres, etc);
    host: process.env.HOST, //Qual servidor está utilizando (Normalmente é o localhost);
    username: process.env.USERNAMEDB, //Qual o nome do seu usuário no postgres;
    password: process.env.PASSWORDDB, //Qual a senha do seu usuário no postgres;
    database: process.env.DATABASE, //Qual o nome do seu database no postgres;
    port: process.env.PORT ,//No caso desse projeto, aqui insere a porta do seu postgres (Normalmente é a 5432);
define:{
underscore:true,
underscoreAll: true,
freezeTableName: true,
},
};