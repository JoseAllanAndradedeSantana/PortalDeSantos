const express = require('express');
const router = express.Router();
const adminAuth = require("../../middlewares/adminAuth");
const mysqlConnection  = require("../../models/dataBaseMysql");

router.get('/admin/tarefa/new', (req, res) => {
    res.render('admin/tarefa/new.ejs')
});


router.get('/chamados', adminAuth, (req, res) => {
    var contador;
    console.log(req.session.usuario);
    const usuarioId = req.session.usuario.id;
    const sqlCountChamados = "SELECT COUNT(*) FROM tb_chamados WHERE status = 'ABERTO' AND idUsuario = ? ORDER BY id DESC";
    const sqlCountChamadosFechados = "SELECT COUNT(*) FROM tb_chamados WHERE status = 'FECHADO' AND idUsuario = ? ORDER BY id DESC";
    const sql = "SELECT * FROM tb_chamados WHERE status = 'ABERTO' AND idUsuario = ? ORDER BY id DESC";
    const sql2 = "SELECT * FROM tb_chamados WHERE status = 'ABERTO' ORDER BY id DESC";

    mysqlConnection.query(sqlCountChamados, [usuarioId], (error, total) => {
        contador = total;
        console.log(contador)
    });

    if (usuarioId != 2 && usuarioId != 1) {
        mysqlConnection.query(sqlCountChamados, [usuarioId], (error, total) => {
            contador = total;
        });
        console.log(sql)
        //connection.query(sql2,[usuarioId], (err, results) =>
        mysqlConnection.query(sql, [usuarioId], (err, results) => {
            if (err) {
                console.error('Erro ao obter chamados:', err);
                res.status(500).send('Erro ao obter chamados.');
                return;
            }
            contador = contador[0]['COUNT(*)'];

            res.render('chamados',
                {
                    chamados: results,
                    contador,
                    usuario: req.session.usuario.nomeUsuario
                });

        });
    } else {
        console.log(sql2)
        mysqlConnection.query(sql2, (err, results) => {
            if (err) {
                console.error('Erro ao obter chamados:', err);
                res.status(500).send('Erro ao obter chamados.');
                return;
            }
            console.log(contador[0]['COUNT(*)']);
            contador = contador[0]['COUNT(*)'];
            res.render('chamados',
                {
                    chamados: results,
                    contador,
                    usuario: req.session.usuario.nomeUsuario
                });
        });
    }
});

module.exports = router;