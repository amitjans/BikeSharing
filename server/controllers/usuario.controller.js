const usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const usuariocontroller = {};

usuariocontroller.singup = (req, res) => {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.contrasena, salt, async function (err, hash) {
            if(err){
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
    usuario.findOne({ correo: req.body.correo }, function (err, user) {
        bcrypt.compare(req.body.contrasena, user.contrasena, function(err, result) {
            if(result){
                const token = jwt.sign({user}, 'secret_key');
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
            res.json(usuarios);
        }
    });
}

usuariocontroller.details = async (req, res) => {
    const usuario = await usuario.findById(req.params.id);
    res.json(usuario);
}

usuariocontroller.edit = async (req, res) => {
    const {
        id
    } = req.params;
    const usuario = {
        usuario: req.body.usuario,
        contrasena: req.body.contrasena,
        puntos: req.body.puntos
    }
    await usuario.findByIdAndUpdate(id, {
        $set: usuario
    }, {
            new: true
        });
    res.json({
        status: 'usuario actualizada'
    });
}

usuariocontroller.delete = async (req, res) => {
    res.json({
        status: 'usuario eliminada'
    });
}

module.exports = usuariocontroller;