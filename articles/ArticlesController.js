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
// Importando o middlewate de Admin
const admMidd = require("../middlewares/authenticationAdmin");

// Rota para a página de criação de artigos

router.get("/admin/articles/new", admMidd, (req, res) => {
    Category.findAll({raw:true}).then(_categories => {
        res.render("admin/articles/new.ejs", {
            categories: _categories
        }); 
    })
})

// Rota para a página que lista os artigos

router.get("/admin/articles", admMidd, (req, res) => {
    Article.findAll({include: [{model: Category}]}).then(_articles => {
        res.render("admin/articles/index.ejs", {
            articles: _articles,          
        });
    })    
})

// Rota para editar artigo individualmente

router.get("/admin/articles/edit/:id", admMidd, (req, res) => {
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
router.get("/admin/articles/:id", admMidd, (req, res) => {
    res.render("admin/articles/view");
})

// Rota para criar paginação

router.get("/articles/page/:num", (req, res) => {
    let n_page = req.params.num;
    let e_pagina = 4;
    let offset;
    if(isNaN(n_page) || n_page < 1){
        res.redirect("/articles/page/1")
    }else if(n_page == 1){
        offset = 0
    }else{
        offset = (parseInt(n_page) - 1) * (e_pagina);
    }
    /**
     * Aqui estamos criando uma paginação, ou seja, definir uma certa quantidade elementos exibidos por página. O elemento Limit significa
     * uma quantidade máxima extraída, começa sempre do 0, por isso, usamos o offset, que defini por onde começar. O offset será setado pela
     * página dada.
     * 
     * Ele devolve um json com dois elementos: COUNT (A quantidade de linhas) e ROWS (Um array com todo conteúdo, linha a linha)
     * 
     */
    Article.findAndCountAll({
        limit: e_pagina,
        offset: offset
    }).then(_articles => {
        // Verifico se há artigo para a página
        let next;
        if(offset + e_pagina> _articles.count) next = false;
        else next = true;

        let results = {
            next: next,
            articles: _articles,
            page: parseInt(n_page)
        }
        Category.findAll().then(_categories => {
            res.render("pagina", {
                results: results,
                categories: _categories
            })
        })
    })
})

// Rota post para criar um artigo

router.post("/articles/new-save", admMidd, (req, res) => {
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

router.post("/articles/delete",admMidd, (req, res) => {
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

router.post("/articles/edit", admMidd,(req, res) => {
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