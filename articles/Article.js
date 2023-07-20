const Sequelize = require("sequelize");
const connection = require("../database/db");
// Importando para relacionar os modelos
const Category = require("../categories/Category");

// Definindo o model de artigo (tabela do mysql)

const Article = connection.define("articles", {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

// Criando um relacionamento 1 para muitos com Sequelize, ou seja, uma categoria possui muitos artigos:

Category.hasMany(Article);
// Criando um relacionamento 1 para 1 com Sequelize, ou seja, um artigo pertence à uma categoria:
Article.belongsTo(Category);

// Recriar a tabela article com os relacionamentos

module.exports = Article;