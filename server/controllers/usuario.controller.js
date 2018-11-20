const usuario = require('../models/usuario');
const rol = require('../models/rol');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const usuariocontroller = {};

usuariocontroller.singup = async (req, res) => {
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
                res.status(201).json({
                    status: 'Usuario guardado'
                });
            }
        });
    });
}

usuariocontroller.singin = async (req, res) => {
    var temp = await usuario.findOne({ correo: req.body.correo }).populate('rol').then((result) => {
        if (result !== null) {
            var tempuser = result;
            bcrypt.compare(req.body.contrasena, tempuser.contrasena, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        usuario: {
                            id: tempuser._id,
                            correo: tempuser.correo,
                            rol: (!!tempuser.rol) ? tempuser.rol.descripcion : ''
                        }
                    }, 'secret_key');
                    res.status(200).json({
                        status: true,
                        correo: req.body.correo,
                        menssage: 'Usuario Autenticado',
                        token: token,
                        details: 'Usuario Autenticado Correctamente'
                    });
                } else {
                    res.status(403).json({
                        status: false,
                        mensaje: 'Credenciales incorrectas',
                        token: '',
                        details: err
                    });
                }
            });
        } else {
            res.status(403).json({
                status: false,
                mensaje: 'Usuario no encontrado',
                token: '',
                details: err
            });
        }
    }).catch((err) => {
        res.status(500).json({
            status: 'Error interno',
            error: err.mensaje
        });
    });
}

usuariocontroller.getList = async (req, res) => {
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            var list = new Array;
            
            if(data.usuario.rol === 'admin'){
                var usuarios = await usuario.find().populate('rol');
                usuarios.forEach(function(element) {
                    list.push({
                        _id: element._id,
                        correo: element.correo,
                        rol: (!!element.rol) ? element.rol.descripcion : ''
                    });
                });
                res.json(list);
            } else {
                var usuarios = await usuario.findById(data.usuario.id).populate('rol');
                list.push({
                    _id: usuarios._id,
                    correo: usuarios.correo,
                    rol: (!!usuarios.rol) ? usuarios.rol.descripcion : ''
                });
                res.json(list);
            }
        }
    });
}

usuariocontroller.details = async (req, res) => {
    const user = await usuario.findById(req.params.id);
    res.json({
        correo: user.correo,
        rol: user.rol.descripcion,
        puntos: user.puntos
    });
}

usuariocontroller.edit = (req, res) => {
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({ error: err });
        } else {
            if (data.usuario.rol === 'admin' || data.usuario.id === req.params.id) {
                const { id } = req.params;
                var temprol = await rol.findById(req.body.rol);
                var act = await usuario.findByIdAndUpdate(id, { $set: req.body }, { new: true });
                temprol.usuarios.push(act);
                temprol.save();
                res.status(200).json();

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