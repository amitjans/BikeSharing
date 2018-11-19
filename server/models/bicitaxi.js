const mongoose = require('mongoose');
const { Schema } = mongoose;
const BicitaxiSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'usuario' },
    chofer: { type: String, required: true },
    capacidad: { type: Number, required: true },
    disponible: { type: Boolean, default: false },
    estado: { type: Boolean, default: true }
})

module.exports = mongoose.model('bicitaxi', BicitaxiSchema);