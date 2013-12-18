"use strict";

var crud = require("../servidor/modelos/crud"),
    assert = require("assert");

describe('Crud', function () {
    var funcaoFalhaCorreta = function (mensagemErro) {
        "use strict";
        assert.ok('Mensagem de erro exibida adequadamente: ' + mensagemErro);
    },
    funcaoSucessoIncorreta = function (resposta) {
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
        var novosDados = {
            campo1: 'valor1',
            campo2: 'valor2',
            campo3: 'valor3'
        };

        var funcaoFalha = function () {
            throw 'Erro';
        };
        var funcaoSucesso = function (dados) {
            assert.notEqual(dados.indexOf(dados), -1);
        };
        it('Inserir adiciona parametros elementos', function () {
            crud.inserir('teste', novosDados, funcaoSucesso, funcaoFalha);
        });
    });
});