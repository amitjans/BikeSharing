const recorridobici = require('../models/recorridobici');
const jwt = require('jsonwebtoken');
const recorridobicicontroller = {};

recorridobicicontroller.getList = async (req, res) => {
    const recorridobicis = await recorridobici.find();
    res.status(200).json(recorridobicis);
}

recorridobicicontroller.details = async (req, res) => {
    const recorridobici = await recorridobici.findById(req.params.id);
    res.status(200).json(recorridobici);
}

recorridobicicontroller.create = async (req, res) => {
    const recorridobici = new recorridobici(req.body);
    await recorridobici.save();
    res.status(200).json({
        status: 'Recorridobici guardada'
    });
}

recorridobicicontroller.edit = async (req, res) => {
    const { id } = req.params;
    await recorridobici.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json({
        status: 'Recorridobici actualizada'
    });
}

recorridobicicontroller.delete = async (req, res) => {
    const { id } = req.params;
    const recorridobici = {
        estado: false
    }
    await recorridobici.findByIdAndUpdate(id, { $set: recorridobici });
    res.status(200).json({
        status: 'Recorridobici eliminada'
    });
}

module.exports = recorridobicicontroller;