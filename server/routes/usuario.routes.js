const express = require('express');
const router = express.Router();
const jwtoken = require('../middlewares/token');

const usuario = require('../controllers/usuario.controller');

router.post('/singin', usuario.singin);
router.post('/singup', usuario.singup);
router.get('/', jwtoken.ensureToken, usuario.getList);
router.get('/:id', usuario.details);
router.put('/:id', usuario.edit);
router.delete('/:id', usuario.delete);

module.exports = router;