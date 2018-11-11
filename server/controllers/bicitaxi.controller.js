const bicitaxi = require('../models/bicitaxi');
const jwt = require('jsonwebtoken');
const bicitaxicontroller = {};

bicitaxicontroller.getList = async (req, res) => {
    const bicitaxis = await bicitaxi.find();
    res.status(200).json(bicitaxis);
}

bicitaxicontroller.details = async (req, res) => {
    const bicitaxi = await bicitaxi.findById(req.params.id);
    res.status(200).json(bicitaxi);
}

bicitaxicontroller.create = async (req, res) => {
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            if (data.usuario.rol === 'admin') {
                const nuevobicitaxi = new bicitaxi(req.body);
                nuevobicitaxi.id_usuario = data.usuario._id
                await nuevobicitaxi.save().then((result) => {
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

bicitaxicontroller.edit = async (req, res) => {
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            var temp = await bicitaxi.findById(req.params.id);
            if (data.usuario.rol === 'admin' || data.usuario._id === temp.id_usuario) {
                    const { id } = req.params;
                    await bicitaxi.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((result) => {
                    res.status(200).json({
                        status: 'Bicitaxi actualizado'
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

bicitaxicontroller.delete = async (req, res) => {
    const { id } = req.params;
    const bicitaxi = {
        estado: false
    }
    await bicitaxi.findByIdAndUpdate(id, { $set: bicitaxi });
    res.status(200).json({
        status: 'Bicitaxi eliminado'
    });
}

module.exports = bicitaxicontroller;