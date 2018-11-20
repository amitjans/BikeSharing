const recorridobici = require('../models/recorridobici');
const estacion = require('../models/estacion');
const bicicleta = require('../models/bicicleta');
const jwt = require('jsonwebtoken');
const recorridobicicontroller = {};

recorridobicicontroller.getList = async (req, res) => {
    const recorridobicis = await recorridobici.find().populate('partida arribo bicicleta usuario');
    res.status(200).json(recorridobicis);
}

recorridobicicontroller.details = async (req, res) => {
    res.status(200).json(await recorridobici.findById(req.params.id));
}

recorridobicicontroller.create = async (req, res) => {
    const obj = new recorridobici(req.body);
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            var bici = await bicicleta.findByIdAndUpdate(req.body.bicicleta, { $set: { rentada: true } }, { new: true });
            obj.usuario = data.usuario.id;
            obj.partida = bici.estacion;
            await obj.save();
            bici.recorridos.push(obj);
            res.status(200).json({
                status: 'Recorrido en bicicleta iniciado',
                id: obj._id
            });
        }
    });
}

recorridobicicontroller.edit = async (req, res) => {
    const temp = await recorridobici.findById(req.params.id);
    temp.arribo = req.body.arribo;
    temp.momento_arrivo = Date.now();
    temp.costo = Math.round((temp.momento_arrivo - temp.momento_partida) / (1000*60)) * 0.5;
    await recorridobici.findByIdAndUpdate(req.params.id, { $set: temp }, { new: true });

    await bicicleta.findByIdAndUpdate(temp.bicicleta, { $set: { estacion: temp.arribo, rentada: false } }, { new: true });

    var est = await estacion.findById(temp.partida);
    est.bicicletas.splice(est.bicicletas.indexOf(temp.bicicleta), 1);
    await est.save();

    est = await estacion.findById(temp.arribo);
    est.bicicletas.push(temp.bicicleta);
    await est.save();

    res.status(200).json({
        status: 'Recorrido en bicicleta finalizado',
        costo: temp.costo
    });
}

recorridobicicontroller.delete = async (req, res) => {
    const { id } = req.params;
    const recorridobici = {
        estado: false
    }
    await recorridobici.findByIdAndUpdate(id, { $set: recorridobici });
    res.status(200).json({
        status: 'Recorridobici eliminada'
    });
}

module.exports = recorridobicicontroller;