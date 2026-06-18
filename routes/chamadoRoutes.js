const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const chamadoController = require('../controllers/chamado/chamadoController');
const upload = require('multer');

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

router.get(
   '/admin/tarefa/new',
    adminAuth,
    chamadoController.criarChamado
);

router.post(
    '/salvarchamado',
    adminAuth,
    chamadoController.salvarChamado
);
module.exports = router;