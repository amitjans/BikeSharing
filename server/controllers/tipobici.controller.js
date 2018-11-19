const tipobici = require('../models/tipobici');
const jwt = require('jsonwebtoken');
const tipobicicontroller = {};

tipobicicontroller.getList = async (req, res) => {
    const tipobicis = await tipobici.find({ estado: true});
    res.status(200).json(tipobicis);
}

tipobicicontroller.details = async (req, res) => {
    const tipobici = await tipobici.findById(req.params.id);
    res.status(200).json(tipobici);
}

tipobicicontroller.bicicletas = async (req, res) => {
    const list = await tipobici.findById(req.params.id).populate('bicicletas');
    res.status(200).json(list.bicicletas);
}

tipobicicontroller.create = async (req, res) => {
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            console.log(data);
            if (data.usuario.rol === 'admin') {
                const nuevotipobici = new tipobici(req.body);
                await nuevotipobici.save();
                res.status(200).json({
                    status: 'tipobici guardado'
                });
            } else {
                res.status(403).json({
                    error: 'Usuario no autorizado a realizar esta accion'
                });
            }
        }
    });
}

tipobicicontroller.edit = async (req, res) => {
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            console.log(data);
            if (data.usuario.rol === 'admin') {
                const { id } = req.params;
                await tipobici.findByIdAndUpdate(id, { $set: req.body }, { new: true });
                res.status(200).json({
                    status: 'tipobici guardado'
                });
            } else {
                res.status(403).json({
                    error: 'Usuario no autorizado a realizar esta accion'
                });
            }
        }
    });
}

tipobicicontroller.delete = async (req, res) => {
    const {
        id
    } = req.params;
    await tipobici.findByIdAndUpdate(id, {
        $set: { estado: false }
    });
    res.status(200).json({
        mensaje: 'Tipo de bicicleta eliminado'
    });
}

module.exports = tipobicicontroller;