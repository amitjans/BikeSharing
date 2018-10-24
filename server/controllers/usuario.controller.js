const usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const usuariocontroller = {};

usuariocontroller.singup = async (req, res, next) => {

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.contrasena, salt, function (err, hash) {
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

usuariocontroller.singin = (req, res, next) => {
    usuario.findOne({ usuario: req.body.usuario }, function (err, user) {
        bcrypt.compare(req.body.contrasena, user.contrasena, function(err, result) {
            if(result){

            } else {
                res.status(403).json({
                    status: false,
                    menssage: 'Credenciales incorrectas'
                });
            }
        });
    });
}

usuariocontroller.getList = async (req, res, next) => {
    const usuarioes = await usuario.find();
    res.json(usuarioes);
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