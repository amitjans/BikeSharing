const express = require('express');
const router = express.Router();
const jwtoken = require('../common/token');

const bicicleta = require('../controllers/bicicleta.controller');

router.get('/', jwtoken.ensureToken, bicicleta.getList);
router.get('/:id', jwtoken.ensureToken, bicicleta.details);
router.post('/', jwtoken.ensureToken, bicicleta.create);
router.put('/:id', jwtoken.ensureToken, bicicleta.edit);
router.delete('/:id', jwtoken.ensureToken, bicicleta.delete);

module.exports = router;