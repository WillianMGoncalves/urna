var crud = require('../modelos/crud');
var utils = require('./utils');

module.exports = function( socket, global ){

    return {

        atualizar: function( partido ){

            var sucessoAtualizacao = function(){

                console.log('Atualizacao do partido realizada com Sucesso!');
            };

            var falhaAtualizacao = function( mensagemErro ){

                console.log('Ocorreu uma falha na atualizacao de partido! Erro:');
                console.log( mensagemErro );
            };

            crud.atualizar( 'partidos', partido, sucessoAtualizacao, falhaAtualizacao );
        },

        obterTudo: function( partidos ){

            var sucessoObtencao = function( partidos ){

                console.log('Obtenção de todos partidos ocorreu com Sucesso!');
                socket.emit( 'partidos-obter-tudo', partidos );
            };

            var falhaObtencao = function( mensagemErro ){

                console.log('Ocorreu uma falha na obtenção de todos partido! Erro:');
                console.log( mensagemErro );
            };

            var partidos = crud.obterTudo( 'partidos', sucessoObtencao, falhaObtencao );
        },

        obterPorId: function( id ){

            var sucessoObtencaoPorId = function(){

                console.log('Obtenção de todos partidos ocorreu com Sucesso!');
            };

            var falhaObtencaoPorId = function( mensagemErro ){

                console.log('Ocorreu uma falha na otenção de partido! Erro:');
                console.log( mensagemErro );
            };

            crud.obterId( 'partidos', id, sucessoObtencaoPorId, falhaObtencaoPorId );
        },

        inserir: function( partido ){

            var sucessoInsercao = function( partidos ){

                console.log('Partido inserido com Sucesso!');
                socket.emit( 'partidos-obter-tudo', partidos );
            };

            var falhaInsercao = function( mensagemErro ){

                console.log('Ocorreu uma falha na inserção de partido! Erro:');
                console.log( mensagemErro );
            };

            crud.inserir( 'partidos', partido, sucessoInsercao, falhaInsercao );
        },

        alterar: function( partido ){

            var sucessoAlteracao = function(partidos){

                console.log('Partido alterado com Sucesso!');
                socket.emit( 'partidos-obter-tudo', partidos );
            };

            var falhaAlteracao = function( mensagemErro ){

                console.log('Ocorreu uma falha na alteração de partido! Erro:');
                console.log( mensagemErro );
            };

            crud.alterar( 'partidos', partido.id, partido, sucessoAlteracao, falhaAlteracao );
        },

        excluir: function( partido ){

            var sucessoExclucao = function(partidos){

                console.log('Partido excluido com Sucesso!');
                socket.emit( 'partidos-obter-tudo', partidos );
            };

            var falhaExclusao = function( mensagemErro ){

                console.log('Ocorreu uma falha na exclusão de partido! Erro:');
                console.log( mensagemErro );
            };

            crud.excluir( 'partidos', partido, sucessoExclucao, falhaExclusao );
        }
    }
};