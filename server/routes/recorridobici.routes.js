const express = require('express');
const router = express.Router();
const jwtoken = require('../common/token');

const recorridobici = require('../controllers/recorridobici.controller');

router.get('/', recorridobici.getList);
router.get('/:id', recorridobici.details);
router.post('/', recorridobici.create);
router.put('/:id', recorridobici.edit);
router.delete('/:id', recorridobici.delete);

module.exports = router;