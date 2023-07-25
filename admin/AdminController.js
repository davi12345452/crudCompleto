const express = require("express");
const router = express.Router();
const Admin = require("./Admin");

// Biblioteca para aplicar hashes às senhas ao guardá-las no db.
const bcrypt = require("bcryptjs");


// Rotas GET:

router.get("/admin/users", (req, res) => {
    Admin.findAll({
        raw: true,
        order: [["id", "DESC"]]
    }).then(_users => {
        res.render("admin/users/index", {
            users: _users
        })
    })
})

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create")
})


router.get("/admin/users/update", (req, res) => {
    
})

// Rotas POST:

// Create Post Router:

router.post("/admin/createAccount", (req, res) => {
    let _email = req.body.email;
    let _password = req.body.password1;
    Admin.findOne({where: {
        email: _email
    }}).then(user => {
        // Se o email ainda não estiver cadastrado
        if(user == undefined){
            // Elemento a mais, para complicar ainda mais a quebra do hash
            let salt = bcrypt.genSaltSync(10); 
            let hash = bcrypt.hashSync(_password, salt);
            Admin.create({
                email: _email,
                password: hash
            }).then( () => {
                res.redirect("/")})
        }else{ // Se ja estiver cadastrado
            res.redirect("/admin/users/create")
        }
    })
})

// Delete Post Router:

router.post("/admin/users/delete", (req, res) => {
    let _id = req.body.id;
    if(_id != undefined){
        if(!isNaN(_id)){
            Admin.destroy({
                where:{
                    id: _id
                }
            }).then( () => {
                res.redirect("/admin/users");
            })
        }else{
            res.redirect("/admin/users");
        }
    }else{
        res.redirect("/admin/users");
    }
})

// Update Post Router:

router.post("", (req, res) => {

})

module.exports = router;