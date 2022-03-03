const express= require('express');
const router = express.Router();
const embarcacao = require('../services/embarcacaoService');

router.get('/', async function (req, res, next) {
    try {
        res.json(await embarcacao.getTodo(req.query.page));
    } catch (error) {
        console.log('deu erro' + error);
        next(error);
    }
});

// get apenas para cliente e suas movimentação
router.get('/cliente', async function name(req, res, next) {
    try {
        res.json(await embarcacao.getCliente(req.query.page));
    } catch (error) {
        console.log('deu erro Cliente GET' + error);
        next(error);
    }
})

router.post('/', async function (req, res, next) {
    try {
        res.json(await embarcacao.create(req.body));
    } catch (error) {
        console.log('deu erro no POST' + error);
        next(error);
    }
})

router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await embarcacao.remove(req.params.id));
    } catch (error) {
        console.log('deu erro no DELETE' + error);
        next(error);
    }
})

router.put('/:id', async function (req, res, next) {
    try {
        res.json(await embarcacao.update(req.params.id, req.body));
    } catch (error) {
        console.log('deu erro no UPDATE' + error);
        next(error);
    }
})

module.exports = router;
