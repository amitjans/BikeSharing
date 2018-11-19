const mongoose = require('mongoose');
const { Schema } = mongoose;
const EstacionSchema = new Schema({
    nombre: { type: String, required: true },
    muelles: { type: Number, required: true },
    direccion: { type: String, require: true },
    lon: { type: Number, required: true },
    lat: { type: Number, required: true },
    estado: { type: Boolean, default: true },
    bicicletas: [{ type: Schema.Types.ObjectId, ref: 'bicicleta' }]
});

module.exports = mongoose.model('estacion', EstacionSchema);