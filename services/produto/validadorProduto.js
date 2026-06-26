class ValidadorProduto {
    
    static validar(produto) {
        produto.nome = 'coca cola teste';
        produto.preco = 10;
        if (!produto.nome) {
            throw new Error("O nome do Produto é obrigatório");
        }

        if (!produto.preco) {
            throw new Error("O preço do Produto é obrigatório");
        }

        if (produto.preco <= 0) {
            throw new Error("O preço deve ser maior que zero");
        }
    }
}

module.exports = ValidadorProduto;