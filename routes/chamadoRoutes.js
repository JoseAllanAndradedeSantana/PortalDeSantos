const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const chamadoController = require('../controllers/chamado/chamadoController');

router.get(
    '/chamados',
    adminAuth,
    chamadoController.buscarChamados
);

router.get(
    '/chamados-filtro',
    adminAuth,
    chamadoController.filtrarChamados
);

module.exports = router;