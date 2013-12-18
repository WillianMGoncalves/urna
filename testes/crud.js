/*global require, describe, it */

var crud = require("../servidor/modelos/crud"),
    assert = require("assert");

describe('Crud', function () {
    "use strict";

    var funcaoFalhaCorreta = function (mensagemErro) {
        assert.ok('Mensagem de erro exibida adequadamente: ' + mensagemErro);
    }, funcaoSucessoIncorreta = function () {
        throw 'Erro';
    };

    describe('obterTudo', function () {
        it('Obter tudo permite endereços errados', function () {
            crud.obterTudo(null, funcaoSucessoIncorreta, funcaoFalhaCorreta);
        });
        it('Obter tudo permite funcaoSucesso inválida', function () {
            assert.throws(function () {
                crud.obterTudo('administradores', null, funcaoFalhaCorreta);
            });
        });
        it('Obter tudo permite funcaoFalha inválida', function () {
            assert.throws(function () {
                crud.obterTudo('administradores', funcaoSucessoIncorreta, null);
            });
        });
    });

    describe('inserir', function () {
        var falha = true,
            novosDados = {
                campo1: 'valor1',
                campo2: 'valor2',
                campo3: 'valor3'
            },
            funcaoFalha = function () {
                throw 'Erro';
            },
            funcaoSucesso = function (dados) {
                var dado,
                    ponteiroDado;
                for (ponteiroDado in dados) {
                    if (dados.hasOwnProperty(ponteiroDado)) {
                        dado = dados[ponteiroDado];
                        if (dado.hasOwnProperty('campo1') && dado.hasOwnProperty('campo2') && dado.hasOwnProperty('campo3')) {
                            if (dado.campo1 === 'valor1' && dado.campo2 === 'valor2' && dado.campo3 === 'valor3') {
                                falha = false;
                            }
                        }
                    }
                }
                assert.ok(!falha);
            };

        it('Inserir adiciona parametros elementos', function () {
            crud.inserir('teste', novosDados, funcaoSucesso, funcaoFalha);
        });
    });
});