var validacaoRequisicoes = function(dadosRequisicao, funcaoSucesso, funcaoFalha ){

    if (true) {
        funcaoSucesso(dadosRequisicao);
    } else {
        funcaoFalha("Requisicao Inválida");
    }
};

module.exports = {
    validacaoRequisicoes: validacaoRequisicoes
};
