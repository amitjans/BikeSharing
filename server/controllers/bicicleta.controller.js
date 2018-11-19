const bicicleta = require('../models/bicicleta');
const estacion = require('../models/estacion');
const tipobici = require('../models/tipobici');
const jwt = require('jsonwebtoken');
const bicicletacontroller = {};

bicicletacontroller.getList = async (req, res) => res.status(200).json(await bicicleta.find({ estado: true }).populate('estacion tipo'));

bicicletacontroller.details = async (req, res) => res.status(200).json(await bicicleta.findById(req.params.id).populate('estacion tipo'));

bicicletacontroller.create = async (req, res) => {
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            if (data.usuario.rol === 'admin') {
                const temp = await estacion.findById(req.body.estacion);
                const tipo = await tipobici.findById(req.body.tipo);
                ;
                cant = (!!req.query.cant) ? req.query.cant : 1;
                var numero = req.body.numero;
                for (let i = 0; i < cant; i++) {
                    const obj = new bicicleta(req.body)
                    obj.numero = numero + i;
                    await obj.save();
                    temp.bicicletas.push(obj);
                    await temp.save();
                    tipo.bicicletas.push(obj);
                    await tipo.save();
                }
                res.status(201).json({
                    status: 'Bicicleta guardada'
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
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            if (data.usuario.rol === 'admin') {
                const { id } = req.params;

                var temp = await bicicleta.findById(id);

                if (temp.tipo !== req.body.tipo) {
                    var tipo = await tipobici.findById(temp.tipo);
                    tipo.bicicletas.splice(tipo.bicicletas.indexOf(temp.tipo), 1);
                    await tipo.save();
                }

                if (temp.estacion !== req.body.estacion) {
                    var est = await estacion.findById(temp.estacion);
                    est.bicicletas.splice(est.bicicletas.indexOf(temp.estacion), 1);
                    await est.save();
                }

                var obj = await bicicleta.findByIdAndUpdate(id, { $set: req.body }, { new: true });
                const newest = await estacion.findById(req.body.estacion);
                const newtipo = await tipobici.findById(req.body.tipo);
                newest.bicicletas.push(obj);
                await newest.save();
                newtipo.bicicletas.push(obj);
                await newtipo.save();
                res.status(200).json({
                    status: 'Bicicleta actualizada'
                });
            }
        }
    });
}

bicicletacontroller.delete = async (req, res) => {
    const { id } = req.params;
    await bicicleta.findByIdAndUpdate(id, { $set: { estado: false }});
    res.status(200).json({
        mensaje: 'Bicicleta eliminada'
    });
}

module.exports = bicicletacontroller;