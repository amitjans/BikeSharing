const bicitaxi = require('../models/bicitaxi');
const jwt = require('jsonwebtoken');
const bicitaxicontroller = {};

bicitaxicontroller.getList = async (req, res) => {
    const bicitaxis = await bicitaxi.find();
    res.status(200).json(bicitaxis);
}

bicitaxicontroller.details = async (req, res) => {
    const bicitaxi = await bicitaxi.findById(req.params.id);
    res.status(200).json(bicitaxi);
}

bicitaxicontroller.create = async (req, res) => {
    const bicitaxi = new bicitaxi(req.body);
    await bicitaxi.save();
    res.status(200).json({
        status: 'Bicitaxi guardado'
    });
}

bicitaxicontroller.edit = async (req, res) => {
    const { id } = req.params;
    await bicitaxi.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json({
        status: 'Bicitaxi actualizado'
    });
}

bicitaxicontroller.delete = async (req, res) => {
    const { id } = req.params;
    const bicitaxi = {
        estado: false
    }
    await bicitaxi.findByIdAndUpdate(id, { $set: bicitaxi });
    res.status(200).json({
        status: 'Bicitaxi eliminado'
    });
}

module.exports = bicitaxicontroller;