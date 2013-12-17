var crud = require("../servidor/modelos/crud");

var assert = require("assert");

describe('Crud', function(){
    describe('obterTudo', function(){
        it('Obter tudo permite parametros errados', function(){
            var funcaoFalha = function( mensagemErro ){
                assert.ok('Ok')
            };
            var funcaoSucesso = function( resposta ){
                assert.notOk('Não foi fornecido um endereco válido');
            }

            crud.obterTudo( null,funcaoSucesso,funcaoFalha );
        })
    })
})