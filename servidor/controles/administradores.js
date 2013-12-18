var crud = this.require('../modelos/crud');
var utils = this.require('./utils');

this.module.exports = function (socket, global) {
    "use strict";
    return {

        atualizar: function (administrador) {

            var sucessoAtualizacao = function () {
                this.console.log('Atualizacao do administrador realizada com Sucesso!');
            },  falhaAtualizacao = function (mensagemErro) {
                this.console.log('Ocorreu uma falha na atualizacao de administrador! Erro:');
                this.console.log(mensagemErro);
            };

            crud.atualizar('administradores', administrador, sucessoAtualizacao,falhaAtualizacao);
        },

        obterTudo: function (administradores) {

            var sucessoObtencao = function (administradores) {
                this.console.log('Obtenção de todos administradores ocorreu com Sucesso!');
                socket.emit('administradores-obter-tudo', administradores);
            }, falhaObtencao = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na obtenção de todos administrador! Erro:');
                this.console.log(mensagemErro);
            };

            crud.obterTudo('administradores', sucessoObtencao, falhaObtencao);
        },

        obterPorId: function (id) {

            var sucessoObtencaoPorId = function () {
                this.console.log('Obtenção de todos administradores ocorreu com Sucesso!');
            }, falhaObtencaoPorId = function (mensagemErro) {
                this.console.log('Ocorreu uma falha na otenção de administrador! Erro:');
                this.console.log(mensagemErro);
            };

            crud.obterId('administradores', id, sucessoObtencaoPorId, falhaObtencaoPorId);
        },

        inserir: function (administrador) {

            var sucessoInsercao = function (administradores) {
                this.console.log('Administrador inserido com Sucesso!');
                socket.emit('administradores-obter-tudo', administradores);
            }, falhaInsercao = function (mensagemErro) {
                this.console.log('Ocorreu uma falha na inserção de administrador! Erro:');
                this.console.log(mensagemErro);
            };

            crud.inserir('administradores', administrador, sucessoInsercao, falhaInsercao);
        },

        alterar: function (administrador) {

            var sucessoAlteracao = function (administradores) {
                this.console.log('Administrador alterado com Sucesso!');
                socket.emit('administradores-obter-tudo', administradores);
            }, falhaAlteracao = function (mensagemErro) {
                this.console.log('Ocorreu uma falha na alteração de administrador! Erro:');
                this.console.log(mensagemErro);
            };

            crud.alterar('administradores', administrador.id, administrador, sucessoAlteracao, falhaAlteracao);
        },

        excluir: function (administrador) {

            var sucessoExclucao = function (administradores) {
                this.console.log('Administrador excluido com Sucesso!');
                socket.emit('administradores-obter-tudo', administradores);
            }, falhaExclusao = function (mensagemErro) {
                this.console.log('Ocorreu uma falha na exclusão de administrador! Erro:');
                this.console.log(mensagemErro);
            };

            crud.excluir('administradores', administrador, sucessoExclucao, falhaExclusao);
        }
    };
};