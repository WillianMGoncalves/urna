/*global require, module, console */

var crud = require('../modelos/crud'),
    utils = require('./utils');

module.exports = function (socket) {

    "use strict";

    return {

        obterTudo: function () {

            var sucessoObtencao = function (dadosSecao) {

                console.log('Obtenção de todos dadosSecao ocorreu com Sucesso!');
                socket.emit('secao-obter-tudo', dadosSecao);
            }, falhaObtencao = function (mensagemErro) {

                console.log('Ocorreu uma falha na obtenção de todos secao! Erro:');
                console.log(mensagemErro);
            };

            crud.obterTudo('secao', sucessoObtencao, falhaObtencao);
        },

        atualizar: function (secao) {

            var sucessoAlteracao = function (dadosSecao) {

                console.log('Secao alterado com Sucesso!');
                socket.emit('secao-obter-tudo', dadosSecao);
            }, falhaAlteracao = function (mensagemErro) {

                console.log('Ocorreu uma falha na alteração de secao! Erro:');
                console.log(mensagemErro);
            };

            crud.atualizar('secao', secao, sucessoAlteracao, falhaAlteracao);
        }
    };
};