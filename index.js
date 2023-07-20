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
app.use("/", categorias, artigos);


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

app.get("/", (req, res) => {
    res.render('index')
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