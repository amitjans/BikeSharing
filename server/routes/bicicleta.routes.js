const express = require('express');
const router = express.Router();
const jwtoken = require('../common/token');

const bicitaxi = require('../controllers/bicitaxi.controller');

router.get('/', jwtoken.ensureToken, bicitaxi.getList);
router.get('/:id', jwtoken.ensureToken, bicitaxi.details);
router.post('/', jwtoken.ensureToken, bicitaxi.create);
router.put('/:id', jwtoken.ensureToken, bicitaxi.edit);
router.delete('/:id', jwtoken.ensureToken, bicitaxi.delete);

module.exports = router;