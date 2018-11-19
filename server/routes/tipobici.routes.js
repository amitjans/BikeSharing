const express = require('express');
const router = express.Router();
const jwtoken = require('../common/token');

const tipobici = require('../controllers/tipobici.controller');

router.get('/', jwtoken.ensureToken, tipobici.getList);
router.get('/:id', jwtoken.ensureToken, tipobici.details);
router.get('/:id/bicicletas', jwtoken.ensureToken, tipobici.bicicletas);
router.post('/', jwtoken.ensureToken, tipobici.create);
router.put('/:id', jwtoken.ensureToken, tipobici.edit);
router.delete('/:id', jwtoken.ensureToken, tipobici.delete);

module.exports = router;