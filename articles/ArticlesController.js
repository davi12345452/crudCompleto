/**
 * Aqui, através do express router, poderemos definir as rotas da aplicação, deixando a aplicação
 * arquitetada e com o código mais clean. 
 */

const express = require("express");
const router = express.Router();
const Article = require("./Article");
const Category = require("../categories/Category")
const Slugify = require("slugify");
const { default: slugify } = require("slugify");

// Rota para a página de criação de artigos

router.get("/admin/articles/new", (req, res) => {
    Category.findAll({raw:true}).then(_categories => {
        res.render("admin/articles/new.ejs", {
            categories: _categories
        }); 
    })
})

// Rota para a página que lista os artigos

router.get("/admin/articles", (req, res) => {
    Article.findAll({raw:true}).then(_articles => {
        res.render("admin/articles/index.ejs", {
            articles: _articles
        });
    })
    
})

// Rota post para criar um artigo

router.post("/articles/new-save", (req, res) => {
    let _title = req.body.title;
    let _text = req.body.text;
    let _category = req.body.category;
    if(_title == undefined || _text == undefined){
        res.redirect("/admin/articles/new");
    }else{
        Article.create({
            title: _title,
            slug: slugify(_title),
            body: _text,
            // Relacionamento das tabelas:
            categoryId: _category
        }).then(() => {
            res.redirect("/admin/articles/new");
        })
    }
})

module.exports = router;