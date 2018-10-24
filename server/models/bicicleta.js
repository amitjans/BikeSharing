const mongoose = require('mongoose');
const { Schema } = mongoose;
const BicicletaSchema = new Schema({
    tipo: { type: String, required: true },
    tamano: { type: Number, required: true },
    rentada: { type: Boolean, required: true },
    estado: { type: Boolean, required: true }
})

module.exports = mongoose.model('bicicleta', BicicletaSchema);
