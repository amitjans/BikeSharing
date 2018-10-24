const Estacion = require('../models/estacion');
const estacioncontroller = {};

estacioncontroller.getList = async (req, res) => {
    const estaciones = await Estacion.find();
    res.json(estaciones);
}

estacioncontroller.details = async (req, res) => {
    const estacion = await Estacion.findById(req.params.id);
    res.json(estacion);
}

estacioncontroller.create = async (req, res) => {
    const estacion = new Estacion(req.body);
    await estacion.save();
    res.json({
        status: 'Estacion guardada'
    });
}

estacioncontroller.edit = async (req, res) => {
    const { id } = req.params;
    const estacion = {
        nombre: req.body.nombre,
        muelles: req.body.muelles,
        direccion: req.body.direccion,
        lon: req.body.lon,
        lat: req.body.lat,
        estado: req.body.estado
    }
    await Estacion.findByIdAndUpdate(id, { $set: estacion }, { new: true });
    res.json({
        status: 'Estacion actualizada'
    });
}

estacioncontroller.delete = async (req, res) => {
    const { id } = req.params;
    const estacion = {
        estado: false
    }
    await Estacion.findByIdAndUpdate(id, { $set: estacion });
    res.json({
        status: 'Estacion eliminada'
    });
}

module.exports = estacioncontroller;