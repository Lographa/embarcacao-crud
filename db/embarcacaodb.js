const Sequelize = require('sequelize');
const database = require('./db');

const conteinerTabela = database.define('conteiner', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }, 
    cliente: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numeroConteiner: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    tipo: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
    statusConteiner: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

const movimentacaoTabela = database.define('movimentacao', {
    TMovimentacao:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    data_inicio:{
        type: Sequelize.DATE,
        allowNull: false
    }, 
    data_fim:{
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    freezeTableName: true
});

conteinerTabela.hasMany(movimentacaoTabela, {as:'movimentacao', hooks:true, onDelete: 'CASCADE', onUpdate: 'CASCADE'});
movimentacaoTabela.belongsTo(conteinerTabela, {foreignKey: 'conteinerId', targetKey: 'id'});

module.exports = {
    conteinerTabela,
    movimentacaoTabela
}