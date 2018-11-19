const mongoose = require('mongoose');
const { Schema } = mongoose;
const TipoBiciSchema = new Schema({
    tipo: { type: String, required: true },
    estado: { type: Boolean, default: true },
    bicicletas: [{ type: Schema.Types.ObjectId, ref: 'bicicleta' }]
})

module.exports = mongoose.model('tipobici', TipoBiciSchema);