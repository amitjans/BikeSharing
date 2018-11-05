const mongoose = require('mongoose');
const { Schema } = mongoose;
const BicitaxiSchema = new Schema({
    id_estacion: { type: String, require: true },
    chofer: { type: String, required: true },
    capacidad: { type: Number, required: true },
    rentada: { type: Boolean, default: false },
    estado: { type: Boolean, default: true }
})

module.exports = mongoose.model('bicitaxi', BicitaxiSchema);