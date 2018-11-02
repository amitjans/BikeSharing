const express = require('express');
const router = express.Router();
const jwtoken = require('../common/token');

const usuario = require('../controllers/usuario.controller');

router.post('/singin', usuario.singin);
router.post('/singup', usuario.singup);
router.get('/', jwtoken.ensureToken, usuario.getList);
router.get('/:id', jwtoken.ensureToken, usuario.details);
router.put('/:id', jwtoken.ensureToken, usuario.edit);
router.delete('/:id', jwtoken.ensureToken, usuario.delete);

module.exports = router;