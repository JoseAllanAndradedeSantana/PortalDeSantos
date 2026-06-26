const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const produtoController = require('../controllers/produto/produtoController');

router.post(
    '/salvar',
    produtoController.salvarProduto
);

router.get(
    '/salvar',
     (req, res, next) => {
        console.log("passei no route proooduuuto salvar");
        next();
    },
    produtoController.salvarProduto
);

router.get(
    '/produto',
    produtoController.produto
)

module.exports = router;