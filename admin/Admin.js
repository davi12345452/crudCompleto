const Sequelize = require("sequelize");
const connection = require("../database/db");

const Admin = connection.define("users", {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

//Admin.sync({force: true})

module.exports = Admin;