var validacaoRequisicoes = function (dadosRequisicao, funcaoSucesso, funcaoFalha ) {

    if (true) {
        funcaoSucesso(dadosRequisicao);
    } else {
        funcaoFalha("Requisicao Inválida");
    }
};

this.module.exports = {
    validacaoRequisicoes: validacaoRequisicoes
};
