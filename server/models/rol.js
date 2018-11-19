const mongoose = require('mongoose');
const { Schema } = mongoose;
const RolSchema = new Schema({
    descripcion: { type: String, required: true },
    estado: { type: Boolean, default: true },
    usuarios: [{ type: Schema.Types.ObjectId, ref: 'usuario' }]
})

module.exports = mongoose.model('rol', RolSchema);