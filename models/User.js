const { Sequelize, Op, Model, DataTypes } = require("sequelize");


const sequelize = require('../config/database');

const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },
  phone:{
    type:DataTypes.STRING(20),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false
  },
  otp:{
    type: DataTypes.INTEGER
  },
  apiKey:{
    type: DataTypes.STRING,
    allowNull:false
  }
  
  
}, {
  // Other model options go here
  tableName: 'users'
});

const Sync = async ()=>{
    await sequelize.sync({force:true});
    // `sequelize.define` also returns the model
    console.log(User === sequelize.models.User); // true
}

//Sync();
module.exports = User;