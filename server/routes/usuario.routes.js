const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuario.controller');

router.get('/singin', usuario.singin);
router.post('/singup', usuario.singup);
router.get('/:id', usuario.details);
router.put('/:id', usuario.edit);
router.delete('/:id', usuario.delete);

module.exports = router;