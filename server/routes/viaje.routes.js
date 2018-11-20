const express = require('express');
const router = express.Router();
const jwtoken = require('../common/token');

const viaje = require('../controllers/viaje.controller');

router.get('/', jwtoken.ensureToken, viaje.getList);
router.get('/:id', jwtoken.ensureToken, viaje.details);
router.post('/', jwtoken.ensureToken, viaje.create);
router.put('/:id', jwtoken.ensureToken, viaje.edit);
router.delete('/:id', jwtoken.ensureToken, viaje.delete);

module.exports = router;