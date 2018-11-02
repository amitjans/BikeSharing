const mongoose = require('mongoose');
const { Schema } = mongoose;
const BicitaxiSchema = new Schema({
    id_estacion: { type: String, require: true },
    tipo: { type: String, required: true },
    tamano: { type: Number, required: true },
    rentada: { type: Boolean, default: false },
    enreparacion: { type: Boolean, required: true },
    estado: { type: Boolean, default: true }
})

module.exports = mongoose.model('bicitaxi', BicitaxiSchema);