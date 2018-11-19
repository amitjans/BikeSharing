const mongoose = require('mongoose');
const { Schema } = mongoose;
const BicicletaSchema = new Schema({
    estacion: { type: Schema.Types.ObjectId, ref: 'estacion' },
    tipo: { type: Schema.Types.ObjectId, ref: 'tipobici' },
    numero: { type: Number, required: true },
    tamano: { type: Number, required: true },
    rentada: { type: Boolean, default: false },
    enreparacion: { type: Boolean, default: false },
    estado: { type: Boolean, default: true },
    recorridos: [{ type: Schema.Types.ObjectId, ref: 'recorridobici' }]
})

module.exports = mongoose.model('bicicleta', BicicletaSchema);
