/**
 *
 * CONFIGURAÇÕES DA APLICAÇÃO
 * 
 */

require('dotenv').config()

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/db");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Possibilitando exportar rotas de outros arquivos:
const categorias = require("./categories/CategoriesController");
const artigos = require("./articles/ArticlesController");
const admin = require("./admin/AdminController");

app.use("/", categorias, artigos, admin);

// Importando os models criando-os:
const Category = require('./categories/Category');
const Article = require('./articles/Article');
const Admin = require("./admin/Admin");

Category.sync({force: false}).then(() => {
    Article.sync({force: false});
  });
  
/**
 *  TESTES DE CONEXÃO DA APLICAÇÃO
 */

// Teste de conexão database:
connection
    .authenticate()
    .then(() => {
        console.log("Database iniciado com sucesso!");
    }).catch((erro) => {
        console.log(`Erro: ${erro}`);
    })



/**
 *  CONFIGURAÇÃO DAS ROTAS GET DA APLICAÇÃO
 */

// Rota para home

app.get("/", (req, res) => {
    Article.findAll({
        order: [["id", "DESC"]],
        limit: 4
    }).then(_articles => {
        Category.findAll().then(_categories => {
            res.render("index.ejs", {
                articles: _articles,
                categories: _categories
            })
        })
    })
})

// Rota para página individual de artigos

app.get("/articles/:slug", (req, res) => {
    let _slug = req.params.slug;
    // É uma maneira do Sequelize, mais rápida, de encontra por id
    Article.findOne({
        where:{
            slug: _slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(_categories => {
                res.render("article.ejs", {
                    article: article,
                    categories: _categories
                })
            })
        }else{
            res.redirect("/");
        }
    }).catch(() => res.redirect("/"));
})

// Rota para acessar por categoria os artigos

app.get("/categories/:slug", (req, res) => {
    let _slug = req.params.slug;
    Category.findOne({
        where:{
            slug: _slug
        },
        include: {model: Article}
    }).then(_category => {
        if(_category != undefined){
            Category.findAll().then(_categories => {
                res.render("index", {
                    articles: _category.articles,
                    categories: _categories
                })
            })
        }else{
            res.redirect("/");
        }
    }).catch(error => res.redirect("/"));
})

/**
 * CONFIGURAÇÃO DAS ROTAS POST DA APLICAÇÃO:
 */

/**
 * INICIALIZAÇÃO DA APLICAÇÃO:
 */

app.listen(8080, e => {
    if(e) console.log("Erro ao iniciar o servidor");
    else console.log("Servidor iniciado com sucesso");
})