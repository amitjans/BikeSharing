const mongoose = require('mongoose');
const { Schema } = mongoose;
const UsuarioSchema = new Schema({
    correo: { type: String, required: true },
    contrasena: { type: String, required: true },
    rol: { type: Schema.Types.ObjectId, ref: 'rol' },
    bicitaxi: { type: Schema.Types.ObjectId, ref: 'bicitaxi' },
    recorridobicis: [{ type: Schema.Types.ObjectId, ref: 'recorridobici' }]
});

module.exports = mongoose.model('usuario', UsuarioSchema);