var crud = require("../servidor/modelos/crud");

var assert = require("assert");

describe('Crud', function(){
    describe('obterTudo', function(){
        it('Obter tudo permite parametros errados', function(){
            var funcaoFalha = function( mensagemErro ){

            };
            var funcaoSucesso = function( resposta ){
                throw 'Erro';
            }

            crud.obterTudo( null,funcaoSucesso,funcaoFalha );
        })
    })
})