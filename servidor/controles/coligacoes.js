var crud = require('../modelos/crud');
var utils = require('./utils');

module.exports = function( socket, global ){

    return {

        atualizar: function( coligacao ){

            var sucessoAtualizacao = function(){

                console.log('Atualizacao do coligacao realizada com Sucesso!');
            };

            var falhaAtualizacao = function( mensagemErro ){

                console.log('Ocorreu uma falha na atualizacao de coligacao! Erro:');
                console.log( mensagemErro )
            };

            crud.atualizar( 'coligacoes', coligacao, sucessoAtualizacao, falhaAtualizacao );
        },

        obterTudo: function( coligacoes ){

            var sucessoObtencao = function( coligacoes ){

                console.log('Obtenção de todos coligacoes ocorreu com Sucesso!');
                socket.emit( 'coligacoes-obter-tudo', coligacoes );
            };

            var falhaObtencao = function( mensagemErro ){

                console.log('Ocorreu uma falha na obtenção de todos coligacao! Erro:');
                console.log( mensagemErro )
            };

            var coligacoes = crud.obterTudo( 'coligacoes', sucessoObtencao, falhaObtencao );
        },

        obterPorId: function( id ){

            var sucessoObtencaoPorId = function(){

                console.log('Obtenção de todos coligacoes ocorreu com Sucesso!');
            };

            var falhaObtencaoPorId = function( mensagemErro ){

                console.log('Ocorreu uma falha na otenção de coligacao! Erro:');
                console.log( mensagemErro )
            };

            crud.obterId( 'coligacoes', id, sucessoObtencaoPorId, falhaObtencaoPorId );
        },

        inserir: function( coligacao ){

            var sucessoInsercao = function( coligacoes ){

                console.log('Coligacao inserido com Sucesso!');
                socket.emit( 'coligacoes-obter-tudo', coligacoes );
            };

            var falhaInsercao = function( mensagemErro ){

                console.log('Ocorreu uma falha na inserção de coligacao! Erro:');
                console.log( mensagemErro )
            };

            crud.inserir( 'coligacoes', coligacao, sucessoInsercao, falhaInsercao );
        },

        alterar: function( coligacao ){

            var sucessoAlteracao = function(coligacoes){

                console.log('Coligacao alterado com Sucesso!');
                socket.emit( 'coligacoes-obter-tudo', coligacoes );
            };

            var falhaAlteracao = function( mensagemErro ){

                console.log('Ocorreu uma falha na alteração de coligacao! Erro:');
                console.log( mensagemErro )
            };

            crud.alterar( 'coligacoes', coligacao.id, coligacao, sucessoAlteracao, falhaAlteracao );
        },

        excluir: function( coligacao ){

            var sucessoExclucao = function(coligacoes){

                console.log('Coligacao excluido com Sucesso!');
                socket.emit( 'coligacoes-obter-tudo', coligacoes );
            };

            var falhaExclusao = function( mensagemErro ){

                console.log('Ocorreu uma falha na exclusão de coligacao! Erro:');
                console.log( mensagemErro )
            };

            crud.excluir( 'coligacoes', coligacao, sucessoExclucao, falhaExclusao );
        }
    }
};