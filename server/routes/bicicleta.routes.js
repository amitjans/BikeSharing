const express = require('express');
const router = express.Router();
const jwtoken = require('../common/token');

const bicitaxi = require('../controllers/bicitaxi.controller');

router.get('/', bicitaxi.getList);
router.get('/:id', bicitaxi.details);
router.post('/', bicitaxi.create);
router.put('/:id', bicitaxi.edit);
router.delete('/:id', bicitaxi.delete);

module.exports = router;