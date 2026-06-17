const mysqlConnection = require('../../models/dataBaseMysql');

const buscarChamados = (usuarioId) => {
    return new Promise((resolve, reject) => {
        
        const sql = `SELECT * FROM tb_chamados WHERE status = 'ABERTO' AND idUsuario = ? ORDER BY id DESC`;

        mysqlConnection.query(sql,[usuarioId] ,(error, result) => {
            if (error) {
                return reject(error);
            }

            resolve(result);
        });
    });
};

const quantidadeDeChamadosAbertos = (usuarioId) => {
    return new Promise((resolve, reject) => {
        
        const sqlCountChamados = "SELECT COUNT(*) FROM tb_chamados WHERE status = 'ABERTO' AND idUsuario = ? ";

        mysqlConnection.query(sqlCountChamados,[usuarioId],(error,result) => {
            if(error){
                return reject(error);
            }
           
            resolve(result[0]['COUNT(*)']);
        });   
    });
};

const quantidadeDeChamadosFechados = (usuarioId) => {
    return new Promise((resolve, reject) => {
        const sqlCountChamadosFechados = `SELECT COUNT(*) FROM tb_chamados WHERE status = 'FECHADO' AND idUsuario = ?`;
        mysqlConnection.query(sqlCountChamadosFechados,[usuarioId],(error,result) => {
            if(error){
                return reject(error);
            }
            resolve(result[0]['COUNT(*)']);
        })
    })
};

const filtrarChamados = (usuarioId, filtros) => {
    return new Promise((resolve, reject) => {

        let sql = "SELECT * FROM tb_chamados WHERE 1=1";
        const params = [];

        if (filtros.status) {
            sql += " AND status = ?";
            params.push(filtros.status);
        }

        if (filtros.empresa) {
            sql += " AND empresa = ?";
            params.push(filtros.empresa);
        }

        if (filtros.dataInicio) {
            sql += " AND dataAbertura >= ?";
            params.push(filtros.dataInicio);
        }

        if (filtros.dataFim) {
            sql += " AND dataAbertura <= ?";
            params.push(filtros.dataFim);
        }

        if (usuarioId) {
            sql += " AND idUsuario = ?";
            params.push(usuarioId);
        }

        sql += " ORDER BY id DESC";

        mysqlConnection.query(sql, params, (error, result) => {

            if (error) {
                return reject(error);
            }

            resolve(result);
        });
    });
};

module.exports = {
    buscarChamados,
    quantidadeDeChamadosAbertos,
    quantidadeDeChamadosFechados,
    filtrarChamados
};