/**
 * Aqui, através do express router, poderemos definir as rotas da aplicação, deixando a aplicação
 * arquitetada e com o código mais clean. 
 */

const express = require("express");
const router = express.Router();

router.get("/artigos", (req, res) => {
    res.send("Rota artigo")
})

module.exports = router;