/*global require, module, console */

var validacaoRequisicoes = function (dadosRequisicao, funcaoSucesso) {

    "use strict";

    funcaoSucesso(dadosRequisicao);
//    if (true) {
//        funcaoSucesso(dadosRequisicao);
//    } else {
//        funcaoFalha("Requisicao Inválida");
//    }
};

module.exports = {
    validacaoRequisicoes: validacaoRequisicoes
};
