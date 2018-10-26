const mongoose = require('mongoose');
const { Schema } = mongoose;
const UsuarioSchema = new Schema({
    correo: { type: String, required: true },
    contrasena: { type: String, required: true },
    rol: { type: String, default: 'usuario' },
    puntos: { type: Number, default: 0 },
});

module.exports = mongoose.model('usuario', UsuarioSchema);