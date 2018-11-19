const express = require('express');
const router = express.Router();
const jwtoken = require('../common/token');

const rol = require('../controllers/rol.controller');

router.get('/', jwtoken.ensureToken, rol.getList);
router.get('/:id', jwtoken.ensureToken, rol.details);
router.get('/:id/usuarios', jwtoken.ensureToken, rol.usuarios);
router.post('/', jwtoken.ensureToken, rol.create);
router.put('/:id', jwtoken.ensureToken, rol.edit);
router.delete('/:id', jwtoken.ensureToken, rol.delete);

module.exports = router;