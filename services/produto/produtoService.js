const mysqlConnection = require('../../models/dataBaseMysql');
const validadorProduto = require('./validadorProduto');

const salvar = (produto) => {
    return new Promise((resolve,reject) => {

        validadorProduto.validar(produto)

        const sql = `
        INSERT INTO tb_produto
        (
            codigo,
            nome,
            descricao,
            preco,
            setor,
            status,
            tipo_embalagem,
            data_cadastro
        )
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const parametros = [
            produto.codigo,
            produto.nome,
            produto.descricao,
            produto.preco,
            produto.setor,
            produto.status,
            produto.tipo_embalagem,
            produto.data_cadastro
        ];
        console.log(parametros);
        mysqlConnection.query(sql,parametros,(error,result) => {
            if(error){
                return reject(error);
            };
            resolve(result);
        });
    });   
};



module.exports = {
    salvar
}