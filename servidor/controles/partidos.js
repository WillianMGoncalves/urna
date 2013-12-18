var crud = this.require('../modelos/crud'),
    utils = this.require('./utils');

this.module.exports = function (socket) {

    "use strict";
    return {

        atualizar: function (partido) {

            var sucessoAtualizacao = function () {

                this.console.log('Atualizacao do partido realizada com Sucesso!');
            }, falhaAtualizacao = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na atualizacao de partido! Erro:');
                this.console.log(mensagemErro);
            };

            crud.atualizar('partidos', partido, sucessoAtualizacao, falhaAtualizacao);
        },

        obterTudo: function () {

            var sucessoObtencao = function (partidos) {

                this.console.log('Obtenção de todos partidos ocorreu com Sucesso!');
                socket.emit('partidos-obter-tudo', partidos);
            }, falhaObtencao = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na obtenção de todos partido! Erro:');
                this.console.log(mensagemErro);
            };

            crud.obterTudo('partidos', sucessoObtencao, falhaObtencao);
        },

        obterPorId: function (id) {

            var sucessoObtencaoPorId = function () {

                this.console.log('Obtenção de todos partidos ocorreu com Sucesso!');
            }, falhaObtencaoPorId = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na otenção de partido! Erro:');
                this.console.log(mensagemErro);
            };

            crud.obterId('partidos', id, sucessoObtencaoPorId, falhaObtencaoPorId);
        },

        inserir: function (partido) {

            var sucessoInsercao = function (partidos) {

                this.console.log('Partido inserido com Sucesso!');
                socket.emit('partidos-obter-tudo', partidos);
            }, falhaInsercao = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na inserção de partido! Erro:');
                this.console.log(mensagemErro);
            };

            crud.inserir('partidos', partido, sucessoInsercao, falhaInsercao);
        },

        alterar: function (partido) {

            var sucessoAlteracao = function (partidos) {

                this.console.log('Partido alterado com Sucesso!');
                socket.emit('partidos-obter-tudo', partidos);
            }, falhaAlteracao = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na alteração de partido! Erro:');
                this.console.log(mensagemErro);
            };

            crud.alterar('partidos', partido.id, partido, sucessoAlteracao, falhaAlteracao);
        },

        excluir: function (partido) {

            var sucessoExclucao = function (partidos) {

                this.console.log('Partido excluido com Sucesso!');
                socket.emit('partidos-obter-tudo', partidos);
            }, falhaExclusao = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na exclusão de partido! Erro:');
                this.console.log(mensagemErro);
            };

            crud.excluir('partidos', partido, sucessoExclucao, falhaExclusao);
        }
    };
};