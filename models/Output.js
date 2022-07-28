const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const sequelize = require('../config/database');
const Board = require("./Board");

const Output = sequelize.define('output',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING
    },
    gpio:{
        type:DataTypes.INTEGER
    },
    state:{
        type:DataTypes.INTEGER
    }
})

Board.hasMany(Output,{
    foreignKey:{
        name:'boardId'
    }
})




module.exports = Output;