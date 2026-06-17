const chamadoService = require('../../services/chamado/chamadoServiceNovo');

const buscarChamados = async (req, res) => {
    try{
        const usuarioId = req.session.usuario.id;
        console.log(usuarioId)
        const chamados = await chamadoService.buscarChamados(usuarioId);
        const quantidadesDeChamados = await chamadoService.quantidadeDeChamadosAbertos(usuarioId);
        const quantidadesDeChamadosFechados = await chamadoService.quantidadeDeChamadosFechados(usuarioId);
        res.render('chamados',{
            chamados:chamados,
            quantidadesDeChamadosEmAbertos:quantidadesDeChamados,
            quantidadesDeChamadosFechados:quantidadesDeChamadosFechados
        });
    } catch(error){
        console.log(error);
        res.status(500).send('Erro ao carregar chamados');
    }
};

const filtrarChamados = async (req, res) => {

    try {

        const usuarioId = req.session.usuario.id;

        const filtros = {
            status: req.query.status,
            empresa: req.query.empresa,
            dataInicio: req.query.dataInicio,
            dataFim: req.query.dataFim
        };

        const chamados =
            await chamadoService.filtrarChamados(usuarioId, filtros);

        const quantidadeAbertos =
            await chamadoService.quantidadeDeChamadosAbertos(usuarioId);

        const quantidadeFechados =
            await chamadoService.quantidadeDeChamadosFechados(usuarioId);

        res.render('chamados', {
            chamados,
            quantidadeAbertos,
            quantidadeFechados
        });

    } catch (error) {

        console.error(error);

        res.status(500).send('Erro ao filtrar chamados');
    }
};

module.exports = {
    buscarChamados,
    filtrarChamados
}