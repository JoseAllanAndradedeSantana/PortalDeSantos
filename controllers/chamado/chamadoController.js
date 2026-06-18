const chamadoService = require('../../services/chamado/chamadoServiceNovo');

const criarChamado = async (req, res) => {
    try{
        res.render('admin/tarefa/new.ejs',{
            usuario:req.session.usuario.nomeUsuario
        })
    }catch(error){

    }
}

const buscarChamados = async (req, res) => {
    try{
        const usuarioId = req.session.usuario.id;
        console.log(req.session.usuario)
        const chamados = await chamadoService.buscarChamados(usuarioId);
        const quantidadesDeChamados = await chamadoService.quantidadeDeChamadosAbertos(usuarioId);
        const quantidadesDeChamadosFechados = await chamadoService.quantidadeDeChamadosFechados(usuarioId);
        res.render('chamados',{
            chamados:chamados,
            quantidadesDeChamadosEmAbertos:quantidadesDeChamados,
            quantidadesDeChamadosFechados:quantidadesDeChamadosFechados,
            usuario:req.session.usuario.nomeUsuario
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
            quantidadesDeChamadosEmAbertos:quantidadeAbertos,
            quantidadesDeChamadosFechados:quantidadeFechados,
            usuario:req.session.usuario.nomeUsuario
        });

    } catch (error) {

        console.error(error);

        res.status(500).send('Erro ao filtrar chamados');
    }
};

const salvarChamado = async (req, res) => {
    try {
        let id = req.session.usuario.id;

        const chamados = await chamadoService.buscarChamados(id);

        const quantidadeAbertos = await chamadoService.quantidadeDeChamadosAbertos(id);
        
        const quantidadeFechados = await chamadoService.quantidadeDeChamadosFechados(id);
        
        await chamadoService.criarChamado({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            empresa: req.body.empresa,
            setor: req.body.setor,
            responsavel: req.body.responsavel,
            dataAbertura: req.body.dataAbertura,
            status: req.body.status,
            prioridade: req.body.prioridade,
            idUsuario: req.session.usuario.id
        });

        res.render('chamados',{
            chamados,
            quantidadesDeChamadosEmAbertos:quantidadeAbertos,
            quantidadesDeChamadosFechados:quantidadeFechados,
            usuario:req.session.usuario.nomeUsuario

        });

    } catch (error) {

        console.error(error);
        res.status(500).send('Erro ao salvar chamado');
    }
};

module.exports = {
    buscarChamados,
    filtrarChamados,
    criarChamado,
    salvarChamado
}