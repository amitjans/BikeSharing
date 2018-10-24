const express = require('express');
const router = express.Router();

const estacion = require('../controllers/estacion.controller');

router.get('/', estacion.getList);
router.get('/:id', estacion.details);
router.post('/', estacion.create);
router.put('/:id', estacion.edit);
router.delete('/:id', estacion.delete);

module.exports = router;