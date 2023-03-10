const Sequelize = require('sequelize');

const sequelize = require('./DB');

const User = sequelize.define('User',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false

    },
    mobile:{
        type:Sequelize.STRING,
        allowNull:false
    }

});
module.exports = User;
