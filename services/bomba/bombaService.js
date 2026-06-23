const express = require('express');
const router = express.Router();
const adminAuth = require("../../middlewares/adminAuth");
const mysqlConnection  = require("../../models/dataBaseMysql");



router.get('/admin/bomba/new-bomba', (req,res) => {
    res.render('admin/bomba/newbomba.ejs',
        {
            newEmpresa:req.query.empresa
        });
});


router.post('/admin/bomba/delete',(req,res) =>{
    let idBomba = req.body.idBomba;
    let empresa = req.body.nome_empresa;
    const sql = `UPDATE tb_bomba SET is_ativo = 0 WHERE id = ?`;
    mysqlConnection.query(sql,[idBomba],(erro,sucess) => {
        res.redirect('/portaldesantos/admin/bomba/bombas/' + empresa);
    });
});

router.get('/admin/bomba/bombas',(req,res) => {
    let empresa = req.session.usuario.empresaUsuario;
    let newEmpresa = req.query.empresa;
    console.log(req.hostname,req.ip,req.originalUrl,req.host);
    console.log(newEmpresa);
    console.dir(req.hostname,req.ip)
    const sql = "SELECT * FROM tb_bomba WHERE empresa = ? AND is_ativo = 1;"
    mysqlConnection.query(sql,[newEmpresa],(erro,sucess) =>{
        res.render('admin/bomba/bombas.ejs', 
            { 
                bombas: sucess,newEmpresa:newEmpresa 
            });
    });
});

router.get('/admin/bomba/bombas/:empresa',(req,res) => {
    let empresa = req.session.usuario.empresaUsuario;
    let newEmpresa = req.params.empresa;
    const sql = "SELECT * FROM tb_bomba WHERE empresa = ? AND is_ativo = 1;"
    mysqlConnection.query(sql,[newEmpresa],(erro,sucess) => {
        res.render('admin/bomba/bombas.ejs', 
            { 
                bombas: sucess,
                newEmpresa:newEmpresa 
            });
    });
});

router.get('/admin/bomba/bomba/:id',(req,res) => {
    let id = req.params.id;
    const sql = "SELECT * FROM tb_bomba WHERE id = ?;"
    mysqlConnection.query(sql,[id],(erro,sucess) =>{
        const numeroBomba = sucess[0].numero;
        const empresa = sucess[0].empresa;
         const sqlLacre = `
            SELECT * 
            FROM tb_lacre_bomba 
            WHERE id_bomba = ?
            AND empresa = ?
            AND is_ativo = 1
            ORDER BY id DESC
        `;
        mysqlConnection.query(sqlLacre,[numeroBomba,empresa],(erro,lacresResult) => {

            if(erro){
                console.log(erro);
                return res.send("Erro");
            }

            res.render('admin/bomba/bomba.ejs',
                 { 
                    bomba: sucess[0],
                    lacres: lacresResult
                });
        });
    });
});

router.post('/admin/lacre/salvar',(req,res) =>{
    let numeroBomba = req.body.numero;
    console.log('PASSEI AQUI ' + numeroBomba);
    let numeroSerie = req.body.numero_serie_lacre;
    let numeroLacre = req.body.numero_lacre;
    let isAtivo = req.body.is_ativo_lacre;
    let empresa = req.body.empresa_lacre;
    let idBomba = req.body.id_bomba_lacre_empresa;

    const sql = "INSERT INTO tb_lacre_bomba(id_bomba,empresa,numero_serie,is_ativo) VALUES (?,?,?,?)";
    mysqlConnection.query(sql,[numeroBomba,empresa,numeroSerie,isAtivo],(erro,success) => {
            res.redirect('/portaldesantos/admin/bomba/bomba/' + idBomba);
    });

});

router.post('/admin/lacre/excluir',(req,res) => {
    let idLacre = req.body.idLacre;
    let idBomba = req.body.idBomba;
    console.log("entrei aqui na inativar lacre " + idLacre + " id: "+idBomba)
    const sql = `UPDATE tb_lacre_bomba SET is_ativo = 0 WHERE id = ?`;
    
    mysqlConnection.query(sql,[idLacre],(error,success) => {
         res.redirect('/portaldesantos/admin/bomba/bomba/' + idBomba);
    })
})

router.post('/admin/bombas/salvar', (req,res) => {
    let numero = req.body.numero;
    let nome = req.body.nome;
    let fabricante = req.body.fabricante;
    let empresa = req.body.empresa;
    let numero_serie = req.body.numero_serie;
    let modelo = req.body.modelo;
    let observacao = req.body.observacao;
    let is_ativo = req.body.is_ativo;
    console.log(is_ativo)

    let sql = "INSERT INTO tb_bomba(numero,nome,fabricante,empresa,numero_serie,modelo,observacao,is_ativo) VALUES (?,?,?,?,?,?,?,?)";

    mysqlConnection.query(sql,[numero,nome,fabricante,empresa,numero_serie,modelo,observacao,is_ativo],(error,success) => {
             if (error) {
                console.log(erro);
                return res.send("Erro");
            }else{
                sql = "SELECT * FROM tb_bomba WHERE empresa = ?";
                mysqlConnection.query(sql,[empresa],(error,success) => {
                    res.render('admin/bomba/bombas.ejs',{ bombas: success});

                });
            }
    });
});

router.post('/admin/bomba/atualizar/:id',(req,res) => {
    console.log('ENTREI NA ATUALIZAÇÃO DE BOMBA')
    let idBomba = req.params.id;
    let empresa = req.body.empresa;
    let isStatus = req.body.is_ativo;
    let fabricante = req.body.fabricante;
    let modelo = req.body.modelo;
    let numeroDeSerie = req.body.numero_serie;
    let observacao = req.body.observacao;
    console.log(idBomba,isStatus,fabricante,modelo,numeroDeSerie,observacao,empresa);
    const sql = `UPDATE tb_bomba SET fabricante=?,modelo=?,numero_serie=?,is_ativo=?, observacao =? WHERE id =?`

    mysqlConnection.query(sql,[fabricante,modelo,numeroDeSerie,isStatus,observacao,idBomba],(error,success) => {
        if(error){
            console.log(error);
        }

        res.redirect(`/portaldesantos/admin/bomba/bombas/${empresa}`);
    })
});

router.get('/admin/edit/bomba/:id',(req,res) => {
    const idBomba = req.params.id;
    const sql = 'SELECT * FROM tb_bomba WHERE id = ?';

    mysqlConnection.query(sql,[idBomba],(error,sucess) => {
        if(error){
            console.log('Error ao encontrar bomba', error);
        }
        res.render('admin/bomba/edit-bomba.ejs',{bomba:sucess[0]});
    });
});

//RELATORIO BOMBA
//TODO PRECISO MELHORAR O RELATORIO
router.get('/admin/relatorio/bomba', (req, res) => {

    const numero = req.query.numero;
    const empresa = req.query.empresa;

    let sql = `
        SELECT 
            b.numero,
            b.empresa,
            l.numero_serie,
            l.is_ativo
        FROM tb_bomba b
        INNER JOIN tb_lacre_bomba l 
            ON l.id_bomba = b.numero
            AND l.empresa = b.empresa
        WHERE b.empresa = ?
    `;

    let params = [empresa];

    if(numero && numero !== ''){
        sql += ` AND b.numero = ? `;
        params.push(numero);
    }

    sql += ` ORDER BY b.numero, l.id DESC `;

    mysqlConnection.query(sql, params, (erro, resultado) => {

        if(erro){
            console.log(erro);
            return res.send("Erro");
        }

        // AGRUPAR
        const bombasAgrupadas = {};

        resultado.forEach(item => {

            if(!bombasAgrupadas[item.numero]){

                bombasAgrupadas[item.numero] = {
                    numero: item.numero,
                    empresa: item.empresa,
                    lacres: []
                };

            }

            bombasAgrupadas[item.numero].lacres.push({
                numero_serie: item.numero_serie,
                is_ativo: item.is_ativo
            });

        });

        res.render('admin/bomba/relatoriobombas', {
            bombas: Object.values(bombasAgrupadas)
        });

    });

});
module.exports = router;