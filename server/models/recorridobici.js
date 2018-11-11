const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecorridoBiciSchema = new Schema({
    id_usuario: { type: String, require: true },
    id_bicicleta: { type: String, require: true },
    id_partida: { type: String, require: true },
    id_arribo: { type: String, require: false },
    momento_partida: { type: Date, default: Date.now },
    momento_arrivo: { type: Date, default: Date.now },
    costo: { type: Number, default: 0 }
})

module.exports = mongoose.model('recorridobici', RecorridoBiciSchema);