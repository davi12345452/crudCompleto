// Middleware de Admin: é uma barreira de segurança para resposta e requisição do usuário.
// Funciona basicamente como modifiers de Solidity, o OnlyOwner, por exemplo. 

const middlAdmin = (req, res, next) => {
    // Se exisitir uma sessão nos cookies, ele devolve um valor de prosseguimento
    if(req.session.user != undefined){
        next();
    // Se não existir, ele redireciona para a home page
    }else{
        res.redirect("/login")
    }
}

module.exports = middlAdmin;