const viaje = require('../models/viaje');
const jwt = require('jsonwebtoken');
var request = require("request");
const haversine = require('../common/haversine');
const viajecontroller = {};

viajecontroller.getList = async (req, res) => res.json(await viaje.find());

viajecontroller.details = async (req, res) => res.json(await viaje.findById(req.params.id));

viajecontroller.create = async (req, res) => {
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            var distance = 0;
            request.get("https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + req.body.lonini + "," + req.body.latini + "&destinations=" + req.body.lonfin + "," + req.body.latfin + "&key=AIzaSyAc8GUTX5ayyuMbjp04sYebvuvsecabiFc", (error, response, body) => {
                if(error) {
                    haversine.formula(req.body.lonini, req.body.lonfin, req.body.latini, req.body.latfin)
                } console.dir(JSON.parse(body));
            });

            if (data.usuario.rol === 'admin') {
                const obj = new viaje(req.body);
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
            } else {
                res.status(403).json({
                    error: 'Usuario no autorizado a realizar este cambio'
                });
            }
        }
    });
}

viajecontroller.edit = async (req, res) => {
    const { id } = req.params;
    await viaje.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.json({
        status: 'viaje actualizada'
    });
}

viajecontroller.delete = async (req, res) => {
    const { id } = req.params;
    await viaje.findByIdAndUpdate(id, { estado: false });
    res.json({
        mensaje: 'Viaje eliminado'
    });
}

module.exports = viajecontroller;