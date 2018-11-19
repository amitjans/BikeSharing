const bicitaxi = require('../models/bicitaxi');
const usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const bicitaxicontroller = {};

bicitaxicontroller.getList = async (req, res) => res.status(200).json(await bicitaxi.find({ estado: true }).populate('usuario'));

bicitaxicontroller.details = async (req, res) => res.status(200).json(await bicitaxi.findById(req.params.id));

bicitaxicontroller.create = async (req, res) => {
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            var usuarioaux = await usuario.findById(data.usuario._id);
            console.log();
            if(usuarioaux.bicitaxi !== null){
                res.status(409).json({
                    mensaje: 'Esta usuario ya posee un bicitaxi'
                });
            } else {
                const nuevobicitaxi = new bicitaxi(req.body);
                nuevobicitaxi.usuario = data.usuario._id
                await nuevobicitaxi.save().then((result) => {
                    res.status(201).json({
                        status: 'Bicitaxi guardado'
                    });
                }).catch((err) => {
                    res.status(500).json({
                        status: 'Error interno',
                        error: err.menssage
                    });
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
            if (data.usuario.rol === 'admin' || data.usuario._id === temp.usuario) {
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
    await bicitaxi.findByIdAndUpdate(id, { $set: { estado: false } });
    res.status(200).json({
        mensaje: 'Bicitaxi eliminado'
    });
}

module.exports = bicitaxicontroller;