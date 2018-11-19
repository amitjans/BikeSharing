const express = require('express');
const router = express.Router();
const jwtoken = require('../common/token');

const estacion = require('../controllers/estacion.controller');

router.get('/', jwtoken.ensureToken, estacion.getList);
router.get('/:id', jwtoken.ensureToken, estacion.details);
router.get('/:id/bicicletas', jwtoken.ensureToken, estacion.bicicletas);
router.post('/', jwtoken.ensureToken, estacion.create);
router.put('/:id', jwtoken.ensureToken, estacion.edit);
router.delete('/:id', jwtoken.ensureToken, estacion.delete);

module.exports = router;