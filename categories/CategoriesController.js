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
    res.render("admin/categories/index.ejs");
})

router.post("/categories/new-save", (req, res) => {
    let _title = req.body.title
    if(_title == undefined){
        console.log("Error, undefined category");
        res.redirect("/admin/categories/new");
    }else{
        Category.create({
            title: _title,
            slug: Slugify(_title) // Maneira de tratar espaços e letras minúsculas: Desenv Web => desenv-web, vai ajudar na rota individual dps
        }).then(() => {
            res.redirect("/");
        })
    }
})

module.exports = router;