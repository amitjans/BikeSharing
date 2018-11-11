const mongoose = require('mongoose');
const { Schema } = mongoose;
const TipoBiciSchema = new Schema({
    tipo: { type: String, required: true }
})

module.exports = mongoose.model('tipobici', TipoBiciSchema);