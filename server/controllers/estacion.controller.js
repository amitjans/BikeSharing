const Estacion = require('../models/estacion');
const bicicleta = require('../models/bicicleta');
const jwt = require('jsonwebtoken');
const haversine = require('../common/haversine');
const estacioncontroller = {};

estacioncontroller.getList = async (req, res) => {
    const estaciones = await Estacion.find();
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
            distancia: (!!req.query.lon && !!req.query.lat) ? haversine.formula(req.query.lon, element.lon, req.query.lat, element.lat) : 0,
            url: '/api/estacion/' + element._id
        });
    });
    res.json(list);
}

estacioncontroller.details = async (req, res) => {
    const estacion = await Estacion.findById(req.params.id);
    var cant = await bicicleta.find({ id_estacion: req.params.id });
    res.json({
        estado: estacion.estado,
        _id: estacion._id,
        nombre: estacion.nombre,
        bicicletas: cant.length,
        muelles: estacion.muelles,
        direccion: estacion.direccion,
        lon: estacion.lon,
        lat: estacion.lat,
        url_bici: '/api/bicicleta?estacion=' + estacion._id
    });
}

estacioncontroller.create = async (req, res) => {
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            if (data.usuario.rol === 'admin') {
                const estacion = new Estacion(req.body);
                await estacion.save().then((result) => {
                    res.status(200).json({
                        status: 'Estacion guardada'
                    });
                }).catch((err) => {
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
    await Estacion.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.json({
        status: 'Estacion actualizada'
    });
}

estacioncontroller.delete = async (req, res) => {
    const {
        id
    } = req.params;
    const estacion = {
        estado: false
    }
    await Estacion.findByIdAndUpdate(id, {
        $set: estacion
    });
    res.json({
        status: 'Estacion eliminada'
    });
}

module.exports = estacioncontroller;