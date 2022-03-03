const db = require('../db/db');
const tabelas = require('../db/embarcacaodb');

async function getTodo() {
    const tabela = await tabelas.conteinerTabela.findAll({
        include: [
            {
                association: 'movimentacao',
                attributes: ["TMovimentacao", 'data_inicio', 'data_fim']
            }
        ]
    })

    return {
        tabela
    }
};

async function create(params) {
    const createConteiner = await tabelas.conteinerTabela.create({
        cliente: params.cliente, 
        numeroConteiner: params.numeroConteiner, 
        tipo: params.tipo, 
        statusConteiner: params.statusConteiner, 
        categoria: params.categoria
    });

    const conteinerID = createConteiner.id;

    const createMovimentacao = await tabelas.movimentacaoTabela.create({
        TMovimentacao: params.TMovimentacao, 
        data_inicio: params.data_inicio, 
        data_fim: params.data_fim,
        conteinerId: conteinerID
    });
    
}

async function remove(id) {
    const deleteTabela = await tabelas.conteinerTabela.destroy({
        where: {id: id}
    });
    
}

async function update(id, params) {
    const result = await tabelas.conteinerTabela.update({
        cliente: params.cliente, 
        numeroConteiner: params.numeroConteiner, 
        tipo: params.tipo, 
        statusConteiner: params.statusConteiner, 
        categoria: params.categoria
    }, {
        where: {id: id}
    }).then(async () => {
        const movimentacaoUpdate = await tabelas.movimentacaoTabela.update({
            TMovimentacao: params.TMovimentacao, 
        data_inicio: params.data_inicio, 
        data_fim: params.data_fim
        }, {
            where: {conteinerId: id}
        })
    })

}

async function getCliente() {
    const tabela = await tabelas.conteinerTabela.findAll( {
        attributes: ['cliente'],
        include:[
            {
                association: 'movimentacao',
                attributes: ["TMovimentacao"]
            }
        ]
    })

    return { 
        tabela
    }
    
}

module.exports = {
    getTodo,
    create,
    remove,
    update,
    getCliente
}