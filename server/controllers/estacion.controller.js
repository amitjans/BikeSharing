const estacion = require('../models/estacion');
const jwt = require('jsonwebtoken');
const haversine = require('../common/haversine');
const estacioncontroller = {};

estacioncontroller.getList = async (req, res) => {
    const estaciones = await estacion.find({ estado: true });
    var list = new Array;
    estaciones.forEach(function (element) {
        list.push({
            estado: element.estado,
            _id: element._id,
            nombre: element.nombre,
            muelles: element.muelles,
            direccion: element.direccion,
            lon: element.lon,
            lat: element.lat,
            distancia: ((!!req.query.lon && !!req.query.lat) ? haversine.formula(req.query.lon, element.lon, req.query.lat, element.lat) : 0) + ' km',
            url: '/api/estacion/' + element._id
        });
    });
    res.json(list);
}

estacioncontroller.details = async (req, res) => {
    const obj = await estacion.findById(req.params.id);
    res.json({
        estado: obj.estado,
        _id: obj._id,
        nombre: obj.nombre,
        bicicletas: obj.bicicletas.length,
        muelles: obj.muelles,
        direccion: obj.direccion,
        lon: obj.lon,
        lat: obj.lat,
        url_bici: '/api/bicicleta?estacion=' + obj._id
    });
}

estacioncontroller.bicicletas = async (req, res) => {
    var temp = await estacion.findById(req.params.id).populate('bicicletas');
    res.status(200).json(temp.bicicletas);
}

estacioncontroller.create = async (req, res) => {
    console.log(req.body);
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            if (data.usuario.rol === 'admin') {
                const obj = new estacion(req.body);
                await obj.save().then((result) => {
                    res.status(200).json({
                        status: 'Estacion guardada'
                    });
                }).catch((err) => {
                    console.log(err.menssage);
                    res.status(500).json({
                        status: 'Error interno',
                        error: err
                    });
                });
            } else {
                res.status(403).json({
                    error: 'Usuario no autorizado a realizar este cambio'
                });
            }
        }
    });
}

estacioncontroller.edit = async (req, res) => {
    const { id } = req.params;
    await estacion.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.json({
        status: 'estacion actualizada'
    });
}

estacioncontroller.delete = async (req, res) => {
    const { id } = req.params;
    await estacion.findByIdAndUpdate(id, { estado: false });
    res.json({
        mensaje: 'Estacion eliminada'
    });
}

module.exports = estacioncontroller;