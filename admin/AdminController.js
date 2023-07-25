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
    }).then(_admins => {
        res.render("/admin/users/listUsers", {
            admins: _admins
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
    // Elemento a mais, para complicar ainda mais a quebra do hash
    let salt = bcrypt.genSaltSync(10); 
    let hash = bcrypt.hashSync(_password, salt);
    Admin.create({
        email: _email,
        password: hash
    }).then( () => {
        res.redirect("/")})
})

// Delete Post Router:

router.post("", (req, res) => {
    
})

// Update Post Router:

router.post("", (req, res) => {

})

module.exports = router;