const mongoose = require('mongoose');
const { Schema } = mongoose;
const BicicletaSchema = new Schema({
    id_estacion: { type: String, require: true },
    id_tipo: { type: String, required: true },
    numero: { type: Number, required: true },
    tamano: { type: Number, required: true },
    rentada: { type: Boolean, default: false },
    enreparacion: { type: Boolean, required: true },
    estado: { type: Boolean, default: true }
})

module.exports = mongoose.model('bicicleta', BicicletaSchema);
