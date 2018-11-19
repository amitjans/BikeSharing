const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecorridoBiciSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'usuario' },
    bicicleta: { type: Schema.Types.ObjectId, ref: 'bicicleta' },
    partida: { type: Schema.Types.ObjectId, ref: 'estacion' },
    arribo: { type: Schema.Types.ObjectId, ref: 'estacion' },
    momento_partida: { type: Date, default: Date.now },
    momento_arrivo: { type: Date, default: Date.now },
    costo: { type: Number, default: 0 }
})

module.exports = mongoose.model('recorridobici', RecorridoBiciSchema);