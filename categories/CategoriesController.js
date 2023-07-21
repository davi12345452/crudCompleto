/**
 * Aqui, através do express router, poderemos definir as rotas da aplicação, deixando a aplicação
 * arquitetada e com o código mais clean. 
 */

const express = require("express");
const router = express.Router();
const Category = require("./Category");
const Slugify = require("slugify");

// Página para a criação de categorias pelo ADM, no seu painel
router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new.ejs");
});

router.get("/admin/categories", (req, res) => {
    Category.findAll({raw:true}).then(_categories => {
        res.render("admin/categories/index.ejs", {
            categories: _categories
        });
    })
    
})

// Rota para abrir o editor de categoria

router.get("/admin/categories/edit/:id", (req, res) => {
    let _id = req.params.id;
    if(isNaN(_id)){
        res.redirect("/admin/categories"); 
    }
    // É uma maneira do Sequelize, mais rápida, de encontra por id
    Category.findByPk(_id).then(category => {
        if(category != undefined){
            res.render("admin/categories/edit.ejs", {categoria: category});
        }else{
            res.redirect("/admin/categories");
        }
    }).catch(() => res.redirect("/admin/categories"));
})

// Rota para criar categoria e guardar dados no db
router.post("/categories/new-save", (req, res) => {
    let _title = req.body.title;
    if(_title == undefined){
        console.log("Error, undefined category");
        res.redirect("/admin/categories/new");
    }else{
        Category.create({
            title: _title,
            slug: Slugify(_title) // Maneira de tratar espaços e letras minúsculas: Desenv Web => desenv-web, vai ajudar na rota individual dps
        }).then(() => {
            res.redirect("/admin/categories");
        })
    }
})

// Rota para apagar uma categoria e seus dados do db

router.post("/categories/delete", (req, res) => {
    let _id = req.body.id;
    if(_id != undefined){
        if(!isNaN(_id)){
            Category.destroy({
                where:{
                    id: _id
                }
            }).then( () => {
                res.redirect("/admin/categories");
            })
        }else{
            res.redirect("/admin/categories");
        }
    }else{
        res.redirect("/admin/categories");
    }
})

// Rota POST para atualizar os dados de Categoria

router.post("/categories/edit", (req, res) => {
    let _id = req.body.id;
    let _title = req.body.title;
    Category.update({title: _title}, {
        where:{
            id: _id
        }
    }).then(() => {
        res.redirect("/admin/categories");
    }).catch(() => {
        res.redirect("/admin/categories");
    })
})
module.exports = router;