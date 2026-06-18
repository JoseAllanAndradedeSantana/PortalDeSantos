const usuarioService = require('../../services/usuario/usuarioService');

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.buscarUsuarios();
        res.render('usuario/usuarios.ejs', {
            usuarios: usuarios
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar usuários');
    }
};

module.exports = {
    listarUsuarios
};