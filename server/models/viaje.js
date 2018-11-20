const mongoose = require('mongoose');
const { Schema } = mongoose;
const ViajeSchema = new Schema({
    lonini: { type: Number, required: true },
    latini: { type: Number, required: true },
    lonfin: { type: Number, required: true },
    latfin: { type: Number, required: true },
    distancia: { type: Number, default: 0},
    bicitaxi: { type: Schema.Types.ObjectId, ref: 'bicitaxi' },
    usuario: { type: Schema.Types.ObjectId, ref: 'usuario' },
    estado: { type: Boolean, default: true }
})

module.exports = mongoose.model('viaje', ViajeSchema);
