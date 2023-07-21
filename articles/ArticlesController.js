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
    Article.findAll({include: [{model: Category}]}).then(_articles => {
        res.render("admin/articles/index.ejs", {
            articles: _articles,          
        });
    })    
})

// Rota para editar artigo individualmente

router.get("/admin/articles/edit/:id", (req, res) => {
    let _id = req.params.id;
    if(isNaN(_id)){
        res.redirect("/admin/articles"); 
    }
    // É uma maneira do Sequelize, mais rápida, de encontra por id
    Article.findByPk(_id).then(article => {
        if(article != undefined){
            Category.findAll({raw:true}).then((_categories) => {
                res.render("admin/articles/edit.ejs", {artigo: article, categories: _categories});
            })
        }else{
            res.redirect("/admin/articles");
        }
    }).catch(() => res.redirect("/admin/articles"));
})

// Rota para exibir artigo individual
router.get("/admin/articles/:id", (req, res) => {
    res.render("admin/articles/view");
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
            res.redirect("/admin/articles");
        })
    }
})

// Rota para deletar um artigo:

router.post("/articles/delete", (req, res) => {
    let _id = req.body.id;
    if(_id != undefined){
        if(!isNaN(_id)){
            Article.destroy({
                where:{
                    id: _id
                }
            }).then( () => {
                res.redirect("/admin/articles");
            })
        }else{
            res.redirect("/admin/articles");
        }
    }else{
        res.redirect("/admin/articles");
    }
})

// Rota para editar um artigos:

router.post("/articles/edit", (req, res) => {
    let _id = req.body.id;
    let _title = req.body.title;
    let _text = req.body.text;
    let _category = req.body.category;
    Article.update(
        {
        title: _title,
        slug: slugify(_title),
        body: _text,
        categoryId: _category
        }, 
        {
        where:{
            id: _id
        }
    }).then(() => {
        res.redirect("/admin/articles");
    }).catch(() => {
        res.redirect("/admin/articles");
    })
})

module.exports = router;