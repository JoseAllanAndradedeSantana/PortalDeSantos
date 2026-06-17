const express = require('express');
const router = express.Router();

const adminAuth = require('../middlewares/adminAuth');
const usuarioController = require('../controllers/usuario/usuarioController');

router.get(
    '/admin/usuarios',
    adminAuth,
    usuarioController.listarUsuarios
);

module.exports = router;