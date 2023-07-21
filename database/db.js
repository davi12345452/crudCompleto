const Sequelize = require("sequelize");

const connection = new Sequelize(process.env.NOME_DO_DB, process.env.USUARIO_MYSQL, process.env.SENHA_MYSQL, {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;