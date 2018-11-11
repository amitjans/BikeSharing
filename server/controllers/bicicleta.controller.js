const bicicleta = require('../models/bicicleta');
const jwt = require('jsonwebtoken');
const bicicletacontroller = {};

bicicletacontroller.getList = async (req, res) => res.status(200).json(!!req.query.estacion ? await bicicleta.find({
    id_estacion: req.query.estacion
}) : await bicicleta.find());

bicicletacontroller.details = async (req, res) => {
    const bicicleta = await bicicleta.findById(req.params.id);
    res.status(200).json(bicicleta);
}

bicicletacontroller.create = async (req, res) => {
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            if (data.usuario.rol === 'admin') {
                const nuevabicicleta = new bicicleta(req.body);
                await nuevabicicleta.save().then((result) => {
                    res.status(200).json({
                        status: 'Bicicleta guardada'
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

bicicletacontroller.edit = async (req, res) => {
    const {
        id
    } = req.params;
    await bicicleta.findByIdAndUpdate(id, {
        $set: req.body
    }, {
        new: true
    });
    res.status(200).json({
        status: 'Bicicleta actualizada'
    });
}

bicicletacontroller.delete = async (req, res) => {
    const {
        id
    } = req.params;
    const bicicleta = {
        estado: false
    }
    await bicicleta.findByIdAndUpdate(id, {
        $set: bicicleta
    });
    res.status(200).json({
        status: 'Bicicleta eliminada'
    });
}

module.exports = bicicletacontroller;