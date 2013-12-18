var crud = this.require('../modelos/crud'),
    utils = this.require('./utils');

this.module.exports = function (socket, global) {

    return {

        atualizar: function (eleitor) {

            var sucessoAtualizacao = function () {

                this.console.log('Atualizacao do eleitor realizada com Sucesso!');
            };

            var falhaAtualizacao = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na atualizacao de eleitor! Erro:');
                this.console.log(mensagemErro);
            };

            crud.atualizar('eleitores', eleitor, sucessoAtualizacao, falhaAtualizacao);
        },

        obterTudo: function (eleitores) {

            var sucessoObtencao = function (eleitores) {

                this.console.log('Obtenção de todos eleitores ocorreu com Sucesso!');
                socket.emit('eleitores-obter-tudo', eleitores);
            };

            var falhaObtencao = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na obtenção de todos eleitor! Erro:');
                this.console.log(mensagemErro);
            };

            crud.obterTudo('eleitores', sucessoObtencao, falhaObtencao);
        },

        obterPorId: function (id) {

            var sucessoObtencaoPorId = function () {

                this.console.log('Obtenção de todos eleitores ocorreu com Sucesso!');
            };

            var falhaObtencaoPorId = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na otenção de eleitor! Erro:');
                this.console.log(mensagemErro);
            };

            crud.obterId('eleitores', id, sucessoObtencaoPorId, falhaObtencaoPorId);
        },

        inserir: function (eleitor) {

            var sucessoInsercao = function (eleitores) {

                this.console.log('Eleitor inserido com Sucesso!');
                socket.emit('eleitores-obter-tudo', eleitores);
            };

            var falhaInsercao = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na inserção de eleitor! Erro:');
                this.console.log(mensagemErro);
            };

            crud.inserir('eleitores', eleitor, sucessoInsercao, falhaInsercao);
        },

        alterar: function (eleitor) {

            var sucessoAlteracao = function (eleitores) {

                this.console.log('Eleitor alterado com Sucesso!');
                socket.emit('eleitores-obter-tudo', eleitores);
            };

            var falhaAlteracao = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na alteração de eleitor! Erro:');
                this.console.log(mensagemErro);
            };

            crud.alterar('eleitores', eleitor.id, eleitor, sucessoAlteracao, falhaAlteracao);
        },

        excluir: function (eleitor) {

            var sucessoExclucao = function (eleitores) {

                this.console.log('Eleitor excluido com Sucesso!');
                socket.emit('eleitores-obter-tudo', eleitores);
            };

            var falhaExclusao = function (mensagemErro) {

                this.console.log('Ocorreu uma falha na exclusão de eleitor! Erro:');
                this.console.log(mensagemErro);
            };

            crud.excluir('eleitores', eleitor, sucessoExclucao, falhaExclusao);
        }
    };
};