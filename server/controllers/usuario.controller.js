const usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const usuariocontroller = {};

usuariocontroller.singup = (req, res) => {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.contrasena, salt, async function (err, hash) {
            if (err) {
                res.status(500).json({
                    status: err
                });
            } else {
                const user = new usuario({
                    correo: req.body.correo,
                    contrasena: hash
                });
                await user.save();
                res.status(200).json({
                    status: 'Usuario guardado'
                });
            }
        });
    });
}

usuariocontroller.singin = (req, res) => {
    usuario.findOne({ correo: req.body.correo }, function (err, usuario) {
        if (err) {
            res.status(500).json({
                status: err
            });
        } else if(usuario === null) {
            res.status(200).json({
                status: 'Usuario invalido'
            });
        } else {
            bcrypt.compare(req.body.contrasena, usuario.contrasena, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        usuario
                    }, 'secret_key');
                    res.status(200).json({
                        status: true,
                        menssage: 'Usuario Autenticado',
                        token: token,
                        details: 'Usuario Autenticado Correctamente'
                    });
                } else {
                    res.status(403).json({
                        status: false,
                        menssage: 'Credenciales incorrectas',
                        token: '',
                        details: err
                    });
                }
            });
        }
    });
}

usuariocontroller.getList = (req, res) => {
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            const usuarios = await usuario.find();
            var list = new Array;
            usuarios.forEach(function(element) {
                list.push({
                    id: element.id,
                    correo: element.correo,
                    rol: element.rol,
                    puntos: element.puntos,
                    url: '/api/usuario/' + element.id
                });
            });
            res.json(list);
        }
    });
}

usuariocontroller.details = async (req, res) => {
    const user = await usuario.findById(req.params.id);
    res.json({
        correo: user.correo,
        rol: user.rol,
        puntos: user.puntos
    });
}

usuariocontroller.edit = (req, res) => {
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({ error: err });
        } else {
            if (data.usuario.rol === 'admin' || data.id === req.params.id) {
                const { id } = req.params;
                await usuario.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((result) => {
                    res.status(200).json({
                        status: 'Usuario actualizado'
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

usuariocontroller.delete = async (req, res) => {
    res.json({
        status: 'Usuario eliminado'
    });
}

module.exports = usuariocontroller;