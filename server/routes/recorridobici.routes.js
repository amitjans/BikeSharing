const express = require('express');
const router = express.Router();
const jwtoken = require('../common/token');

const recorridobici = require('../controllers/recorridobici.controller');

router.get('/', jwtoken.ensureToken, recorridobici.getList);
router.get('/:id', jwtoken.ensureToken, recorridobici.details);
router.post('/', jwtoken.ensureToken, recorridobici.create);
router.put('/:id', jwtoken.ensureToken, recorridobici.edit);
router.delete('/:id', jwtoken.ensureToken, recorridobici.delete);

module.exports = router;