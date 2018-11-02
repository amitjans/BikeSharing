const express = require('express');
const router = express.Router();
const jwtoken = require('../common/token');

const bicicleta = require('../controllers/bicicleta.controller');

router.get('/', bicicleta.getList);
router.get('/:id', bicicleta.details);
router.post('/', bicicleta.create);
router.put('/:id', bicicleta.edit);
router.delete('/:id', bicicleta.delete);

module.exports = router;