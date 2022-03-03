const mysql = require('mysql2/promise');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('conteinerdb', 'root', 'container', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;