/*global require, module, console */

var crud = require('../modelos/crud'),
    utils = require('./utils');

module.exports = function (socket) {
    "use strict";
    return {

        atualizar: function (administrador) {

            var sucessoAtualizacao = function () {
                console.log('Atualizacao do administrador realizada com Sucesso!');
            },  falhaAtualizacao = function (mensagemErro) {
                console.log('Ocorreu uma falha na atualizacao de administrador! Erro:');
                console.log(mensagemErro);
            };

            crud.atualizar('administradores', administrador, sucessoAtualizacao, falhaAtualizacao);
        },

        obterTudo: function () {

            var sucessoObtencao = function (administradores) {
                console.log('Obtenção de todos administradores ocorreu com Sucesso!');
                socket.emit('administradores-obter-tudo', administradores);
            }, falhaObtencao = function (mensagemErro) {

                console.log('Ocorreu uma falha na obtenção de todos administrador! Erro:');
                console.log(mensagemErro);
            };

            crud.obterTudo('administradores', sucessoObtencao, falhaObtencao);
        },

        obterPorId: function (id) {

            var sucessoObtencaoPorId = function () {
                console.log('Obtenção de todos administradores ocorreu com Sucesso!');
            }, falhaObtencaoPorId = function (mensagemErro) {
                console.log('Ocorreu uma falha na otenção de administrador! Erro:');
                console.log(mensagemErro);
            };

            crud.obterId('administradores', id, sucessoObtencaoPorId, falhaObtencaoPorId);
        },

        inserir: function (administrador) {

            var sucessoInsercao = function (administradores) {
                console.log('Administrador inserido com Sucesso!');
                socket.emit('administradores-obter-tudo', administradores);
            }, falhaInsercao = function (mensagemErro) {
                console.log('Ocorreu uma falha na inserção de administrador! Erro:');
                console.log(mensagemErro);
            };

            crud.inserir('administradores', administrador, sucessoInsercao, falhaInsercao);
        },

        alterar: function (administrador) {

            var sucessoAlteracao = function (administradores) {
                console.log('Administrador alterado com Sucesso!');
                socket.emit('administradores-obter-tudo', administradores);
            }, falhaAlteracao = function (mensagemErro) {
                console.log('Ocorreu uma falha na alteração de administrador! Erro:');
                console.log(mensagemErro);
            };

            crud.alterar('administradores', administrador.id, administrador, sucessoAlteracao, falhaAlteracao);
        },

        excluir: function (administrador) {

            var sucessoExclucao = function (administradores) {
                console.log('Administrador excluido com Sucesso!');
                socket.emit('administradores-obter-tudo', administradores);
            }, falhaExclusao = function (mensagemErro) {
                console.log('Ocorreu uma falha na exclusão de administrador! Erro:');
                console.log(mensagemErro);
            };

            crud.excluir('administradores', administrador, sucessoExclucao, falhaExclusao);
        }
    };
};