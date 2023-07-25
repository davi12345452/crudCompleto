const express = require("express");
const router = express.Router();
const Admin = require("./Admin");


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

router.post("", (req, res) => {
    
})

// Delete Post Router:

router.post("", (req, res) => {
    
})

// Update Post Router:

router.post("", (req, res) => {

})

module.exports = router;