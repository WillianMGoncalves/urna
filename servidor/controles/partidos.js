/*global require, module, console */

var crud = require('../modelos/crud'),
    utils = require('./utils');

module.exports = function (socket) {

    "use strict";
    return {

        atualizar: function (partido) {

            var sucessoAtualizacao = function () {

                console.log('Atualizacao do partido realizada com Sucesso!');
            }, falhaAtualizacao = function (mensagemErro) {

                console.log('Ocorreu uma falha na atualizacao de partido! Erro:');
                console.log(mensagemErro);
            };

            crud.atualizar('partidos', partido, sucessoAtualizacao, falhaAtualizacao);
        },

        obterTudo: function () {

            var sucessoObtencao = function (partidos) {

                console.log('Obtenção de todos partidos ocorreu com Sucesso!');
                socket.emit('partidos-obter-tudo', partidos);
            }, falhaObtencao = function (mensagemErro) {

                console.log('Ocorreu uma falha na obtenção de todos partido! Erro:');
                console.log(mensagemErro);
            };

            crud.obterTudo('partidos', sucessoObtencao, falhaObtencao);
        },

        obterPorId: function (id) {

            var sucessoObtencaoPorId = function () {

                console.log('Obtenção de todos partidos ocorreu com Sucesso!');
            }, falhaObtencaoPorId = function (mensagemErro) {

                console.log('Ocorreu uma falha na otenção de partido! Erro:');
                console.log(mensagemErro);
            };

            crud.obterId('partidos', id, sucessoObtencaoPorId, falhaObtencaoPorId);
        },

        inserir: function (partido) {

            var sucessoInsercao = function (partidos) {

                console.log('Partido inserido com Sucesso!');
                socket.emit('partidos-obter-tudo', partidos);
            }, falhaInsercao = function (mensagemErro) {

                console.log('Ocorreu uma falha na inserção de partido! Erro:');
                console.log(mensagemErro);
            };

            crud.inserir('partidos', partido, sucessoInsercao, falhaInsercao);
        },

        alterar: function (partido) {

            var sucessoAlteracao = function (partidos) {

                console.log('Partido alterado com Sucesso!');
                socket.emit('partidos-obter-tudo', partidos);
            }, falhaAlteracao = function (mensagemErro) {

                console.log('Ocorreu uma falha na alteração de partido! Erro:');
                console.log(mensagemErro);
            };

            crud.alterar('partidos', partido.id, partido, sucessoAlteracao, falhaAlteracao);
        },

        excluir: function (partido) {

            var sucessoExclucao = function (partidos) {

                console.log('Partido excluido com Sucesso!');
                socket.emit('partidos-obter-tudo', partidos);
            }, falhaExclusao = function (mensagemErro) {

                console.log('Ocorreu uma falha na exclusão de partido! Erro:');
                console.log(mensagemErro);
            };

            crud.excluir('partidos', partido, sucessoExclucao, falhaExclusao);
        }
    };
};