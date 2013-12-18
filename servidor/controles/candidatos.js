var crud = this.require('../modelos/crud');
var utils = this.require('./utils');

module.exports = function (socket, global) {

    return {

        atualizar: function (candidato) {

            var sucessoAtualizacao = function () {

                this.console.log('Atualizacao do candidato realizada com Sucesso!');
            }, falhaAtualizacao = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na atualizacao de candidato! Erro:');
                this.console.log(mensagemErro);
            };

            crud.atualizar('candidatos', candidato, sucessoAtualizacao, falhaAtualizacao);
        },

        obterTudo: function (candidatos) {

            var sucessoObtencao = function (candidatos) {

                this.console.log('Obtenção de todos candidatos ocorreu com Sucesso!');
                socket.emit('candidatos-obter-tudo', candidatos);
            }, falhaObtencao = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na obtenção de todos candidato! Erro:');
                this.console.log(mensagemErro);
            };

            crud.obterTudo('candidatos', sucessoObtencao, falhaObtencao);
        },

        obterPorId: function (id) {

            var sucessoObtencaoPorId = function () {

                this.console.log('Obtenção de todos candidatos ocorreu com Sucesso!');
            }, falhaObtencaoPorId = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na otenção de candidato! Erro:');
                this.console.log(mensagemErro);
            };

            crud.obterId('candidatos', id, sucessoObtencaoPorId, falhaObtencaoPorId);
        },

        inserir: function (candidato) {

            var sucessoInsercao = function (candidatos) {

                this.console.log('Candidato inserido com Sucesso!');
                socket.emit('candidatos-obter-tudo', candidatos);
            }, falhaInsercao = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na inserção de candidato! Erro:');
                this.console.log(mensagemErro);
            };

            crud.inserir('candidatos', candidato, sucessoInsercao, falhaInsercao);
        },

        alterar: function (candidato) {

            var sucessoAlteracao = function (candidatos) {

                this.console.log('Candidato alterado com Sucesso!');
                socket.emit('candidatos-obter-tudo', candidatos);
            }, falhaAlteracao = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na alteração de candidato! Erro:');
                this.console.log(mensagemErro);
            };

            crud.alterar('candidatos', candidato.id, candidato, sucessoAlteracao, falhaAlteracao);
        },

        excluir: function (candidato) {

            var sucessoExclucao = function (candidatos) {

                this.console.log('Candidato excluido com Sucesso!');
                socket.emit('candidatos-obter-tudo', candidatos);
            }, falhaExclusao = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na exclusão de candidato! Erro:');
                this.console.log(mensagemErro);
            };

            crud.excluir('candidatos', candidato, sucessoExclucao, falhaExclusao);
        }
    };
};