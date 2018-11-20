const viaje = require('../models/viaje');
const bicitaxi = require('../models/bicitaxi');
const usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
var request = require("request");
const haversine = require('../common/haversine');
const viajecontroller = {};

viajecontroller.getList = async (req, res) => res.json(await viaje.find().populate('usuario bicitaxi'));

viajecontroller.details = async (req, res) => res.json(await viaje.findById(req.params.id));

viajecontroller.create = async (req, res) => {
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            var distance = 0;
            await request.get("https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + req.body.lonini + "," + req.body.latini + "&destinations=" + req.body.lonfin + "," + req.body.latfin + "&key=AIzaSyAc8GUTX5ayyuMbjp04sYebvuvsecabiFc", async (error, response, body) => {
                if (error || JSON.parse(body).status === "OVER_QUERY_LIMIT") {
                    console.log('llego');
                    distance = haversine.formula(req.body.lonini, req.body.lonfin, req.body.latini, req.body.latfin);
                } else {
                    distance = JSON.parse(body).rows[0].elements[0].distance.value;
                }
                const obj = new viaje(req.body);
                obj.distancia = distance;
                obj.usuario = data.usuario.id;
                await obj.save().then((result) => {
                    res.status(200).json({
                        status: 'viaje guardada'
                    });
                }).catch((err) => {
                    res.status(500).json({
                        status: 'Error interno',
                        error: err
                    });
                });
                });
        }
    });
}

viajecontroller.edit = async (req, res) => {
    const { id } = req.params;

    if (req.body.estado) {
        jwt.verify(req.token, 'secret_key', async (err, data) => {
            if (err) {
                res.status(403).json({
                    error: err
                });
            } else {
                await usuario.findById(data.usuario.id).populate('bicitaxi').then(async (result) => {
                    var temp = await viaje.findByIdAndUpdate(id, { $set: { bicitaxi: result.bicitaxi } }, { new: true });
                    var taxi = result.bicitaxi;
                    taxi.viajes.push(temp);
                    taxi.save();
                    res.json({
                        mensaje: 'Viaje aceptado'
                    });
                });
            }
        })
    } else {
        await viaje.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.json({
            status: 'Viaje actualizado'
        });
    }
}

viajecontroller.delete = async (req, res) => {
    const { id } = req.params;
    await viaje.findByIdAndUpdate(id, { estado: false });
    res.json({
        mensaje: 'Viaje eliminado'
    });
}

module.exports = viajecontroller;