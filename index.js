const express = require('express');
const app = express();
const db = require('./db/db');
const embarcacaoRouter = require('./routes/embarcacaoRoutes');


app.use(express.json());
app.use( express.urlencoded({
    extended: true
}));

app.get('/', (req,res) => {
    res.json({message:'ok' })
})

app.listen('3000', function () {
    console.log("aberto na porta 3000");
})

db.sync(() => console.log("banco de dados aberto"));

app.use('/embarcacao', embarcacaoRouter);