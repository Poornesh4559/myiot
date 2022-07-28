const { Sequelize, Op, Model, DataTypes } = require("sequelize");


const sequelize = require('../config/database');
const User = require("./User");

const Board = sequelize.define('board',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true
    },
    lastReqested:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
},{
    tableName:'boards'
});

User.hasMany(Board,{
    foreignKey:{
        name:'userID'
    }
});
//Board.belongsTo(User);




module.exports = Board;