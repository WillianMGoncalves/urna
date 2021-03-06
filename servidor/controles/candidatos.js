/*global require, module, console */

var crud = require('../modelos/crud'),
    utils = require('./utils');

module.exports = function (socket) {
    "use strict";

    return {

        atualizar: function (candidato) {

            var sucessoAtualizacao = function () {

                console.log('Atualizacao do candidato realizada com Sucesso!');
            }, falhaAtualizacao = function (mensagemErro) {

                console.log('Ocorreu uma falha na atualizacao de candidato! Erro:');
                console.log(mensagemErro);
            };

            crud.atualizar('candidatos', candidato, sucessoAtualizacao, falhaAtualizacao);
        },

        obterTudo: function () {

            var sucessoObtencao = function (candidatos) {

                console.log('Obtenção de todos candidatos ocorreu com Sucesso!');
                socket.emit('candidatos-obter-tudo', candidatos);
            }, falhaObtencao = function (mensagemErro) {

                console.log('Ocorreu uma falha na obtenção de todos candidato! Erro:');
                console.log(mensagemErro);
            };

            crud.obterTudo('candidatos', sucessoObtencao, falhaObtencao);
        },

        obterPorId: function (id) {

            var sucessoObtencaoPorId = function () {

                console.log('Obtenção de todos candidatos ocorreu com Sucesso!');
            }, falhaObtencaoPorId = function (mensagemErro) {

                console.log('Ocorreu uma falha na otenção de candidato! Erro:');
                console.log(mensagemErro);
            };

            crud.obterId('candidatos', id, sucessoObtencaoPorId, falhaObtencaoPorId);
        },

        inserir: function (candidato) {

            var sucessoInsercao = function (candidatos) {

                console.log('Candidato inserido com Sucesso!');
                socket.emit('candidatos-obter-tudo', candidatos);
            }, falhaInsercao = function (mensagemErro) {

                console.log('Ocorreu uma falha na inserção de candidato! Erro:');
                console.log(mensagemErro);
            };

            crud.inserir('candidatos', candidato, sucessoInsercao, falhaInsercao);
        },

        alterar: function (candidato) {

            var sucessoAlteracao = function (candidatos) {

                console.log('Candidato alterado com Sucesso!');
                socket.emit('candidatos-obter-tudo', candidatos);
            }, falhaAlteracao = function (mensagemErro) {

                console.log('Ocorreu uma falha na alteração de candidato! Erro:');
                console.log(mensagemErro);
            };

            crud.alterar('candidatos', candidato.id, candidato, sucessoAlteracao, falhaAlteracao);
        },

        excluir: function (candidato) {

            var sucessoExclucao = function (candidatos) {

                console.log('Candidato excluido com Sucesso!');
                socket.emit('candidatos-obter-tudo', candidatos);
            }, falhaExclusao = function (mensagemErro) {

                console.log('Ocorreu uma falha na exclusão de candidato! Erro:');
                console.log(mensagemErro);
            };

            crud.excluir('candidatos', candidato, sucessoExclucao, falhaExclusao);
        }
    };
};