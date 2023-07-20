const Sequelize = require("sequelize");
const connection = require("../database/db");

// Definindo o model de categoria (tabela do mysql)

const Category = connection.define("categories", {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
})


// Recriar a tabela categories com os relacionamentos definidos no Article.js
module.exports = Category;