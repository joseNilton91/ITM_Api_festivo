
const mongoose = require('mongoose');
const festivoSchema = new mongoose.Schema({
    id: Number,
    tipo: String,
    modoCalculo: String,
    festivos: [{
        dia: Number,
        mes: Number,
        nombre: String,
        diasPascua: Number
    }]
});
const Festivo = mongoose.model('Festivo', festivoSchema, 'tipos_festivos');

module.exports = Festivo;