const bicicleta = require('../models/bicicleta');
const bicicletacontroller = {};

bicicletacontroller.getList = async (req, res) => {
    const bicicletas = await bicicleta.find();
    res.status(200).json(bicicletas);
}

bicicletacontroller.details = async (req, res) => {
    const bicicleta = await bicicleta.findById(req.params.id);
    res.status(200).json(bicicleta);
}

bicicletacontroller.create = async (req, res) => {
    const bicicleta = new bicicleta(req.body);
    await bicicleta.save();
    res.status(200).json({
        status: 'Bicicleta guardada'
    });
}

bicicletacontroller.edit = async (req, res) => {
    const { id } = req.params;
    await bicicleta.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json({
        status: 'Bicicleta actualizada'
    });
}

bicicletacontroller.delete = async (req, res) => {
    const { id } = req.params;
    const bicicleta = {
        estado: false
    }
    await bicicleta.findByIdAndUpdate(id, { $set: bicicleta });
    res.status(200).json({
        status: 'Bicicleta eliminada'
    });
}

module.exports = bicicletacontroller;