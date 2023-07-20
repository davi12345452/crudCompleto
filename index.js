const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("BEM VINDO");
})

app.listen(8080, e => {
    if(e) console.log("Erro ao iniciar o servidor");
    else console.log("Servidor iniciado com sucesso");
})