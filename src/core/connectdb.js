const Sequelize  = require('sequelize');
const config = require('../config/config.json');
const db ={};
const sequelize = new Sequelize( config.database.database, config.database.username, config.database.password, {
    host: config.database.host,
    port:config.database.port,
    dialect: config.database.dialect,
    dialectOptions: {connectTimeout: 1000} // mariadb connector option
  })
  
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  db.Sequelize = Sequelize ;
  db.sequelize = sequelize;
  module.exports = db;