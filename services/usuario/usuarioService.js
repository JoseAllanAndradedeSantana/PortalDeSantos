const mysqlConnection = require('../../models/dataBaseMysql');

const buscarUsuarios = () => {
    return new Promise((resolve, reject) => {

        const sql = `
            SELECT *
            FROM tb_usuarios
        `;

        mysqlConnection.query(sql, (error, result) => {
            if (error) {
                return reject(error);
            }

            resolve(result);
        });
    });
};

module.exports = {
    buscarUsuarios
};