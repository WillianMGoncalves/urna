var crud = this.require('../modelos/crud'),
    utils = this.require('./utils');

this.module.exports = function (socket) {

    "use strict";

    return {

        obterTudo: function () {

            var sucessoObtencao = function (dadosSecao) {

                this.console.log('Obtenção de todos dadosSecao ocorreu com Sucesso!');
                socket.emit('secao-obter-tudo', dadosSecao);
            }, falhaObtencao = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na obtenção de todos secao! Erro:');
                this.console.log(mensagemErro);
            };

            crud.obterTudo('secao', sucessoObtencao, falhaObtencao);
        },

        atualizar: function (secao) {

            var sucessoAlteracao = function (dadosSecao) {

                this.console.log('Secao alterado com Sucesso!');
                socket.emit('secao-obter-tudo', dadosSecao);
            }, falhaAlteracao = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na alteração de secao! Erro:');
                this.console.log(mensagemErro);
            };

            crud.atualizar('secao', secao, sucessoAlteracao, falhaAlteracao);
        }
    };
};