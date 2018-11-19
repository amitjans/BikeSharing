const rol = require('../models/rol');
const jwt = require('jsonwebtoken');
const rolcontroller = {};

rolcontroller.getList = async (req, res) => res.status(200).json(await rol.find({ estado: true }));

rolcontroller.details = async (req, res) => res.status(200).json(await rol.findById(req.params.id));

rolcontroller.usuarios = async (req, res) => res.status(200).json(await rol.findById(req.params.id).populate('usuarios').usuarios);

rolcontroller.create = async (req, res) => {
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err.mensage
            });
        } else {
            if (!!data.usuario.rol && data.usuario.rol === 'admin') {
                const obj = new rol(req.body);
                await obj.save().then((result) => {
                    res.status(201).json({
                        status: 'rol guardado'
                    });
                }).catch((err) => {
                    res.status(500).json({
                        status: 'Error interno',
                        error: err.mensage
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

rolcontroller.edit = async (req, res) => {
    const { id } = req.params;
    await rol.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json({
        status: 'Rol actualizado'
    });
}

rolcontroller.delete = async (req, res) => {
    const { id } = req.params;
    await rol.findByIdAndUpdate(id, { $set: { estado: false } }, { new: true }).then((result) => {
        res.status(200).json({
            mensaje: 'Rol Eliminado'
        });
    }).catch((err) => {
        res.status(500).json({
            mensaje: 'Error interno',
            error: err.mensage
        });
    });
}

module.exports = rolcontroller;