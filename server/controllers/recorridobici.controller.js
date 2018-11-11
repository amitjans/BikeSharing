const recorridobici = require('../models/recorridobici');
const bicicleta = require('../models/bicicleta');
const jwt = require('jsonwebtoken');
const recorridobicicontroller = {};

recorridobicicontroller.getList = async (req, res) => {
    const recorridobicis = await recorridobici.find();
    res.status(200).json(recorridobicis);
}

recorridobicicontroller.details = async (req, res) => {
    res.status(200).json(await recorridobici.findById(req.params.id));
}

recorridobicicontroller.create = async (req, res) => {
    const nuevorecorridobici = new recorridobici(req.body);
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            nuevorecorridobici.id_usuario = data.usuario._id;
            await nuevorecorridobici.save();
            await bicicleta.findByIdAndUpdate(req.body.id_bicicleta, { $set: { rentada: true } }, { new: true });
            res.status(200).json({
                status: 'Recorrido en bicicleta iniciado',
                id: nuevorecorridobici._id
            });
        }
    });
}

recorridobicicontroller.edit = async (req, res) => {
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            const temp = await recorridobici.findById(req.params.id);
            temp.id_arribo = req.body.id_estacion;
            temp.momento_arrivo = Date.now();
            temp.costo = Math.round((temp.momento_arrivo - temp.momento_partida) / (1000*60)) * 0.5;
            await recorridobici.findByIdAndUpdate(req.params.id, { $set: temp }, { new: true });
            await bicicleta.findByIdAndUpdate(temp.id_bicicleta, { $set: { id_estacion: temp.id_arribo, rentada: false } }, { new: true });
            res.status(200).json({
                status: 'Recorrido en bicicleta finalizado',
                costo: temp.costo
            });
        }
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