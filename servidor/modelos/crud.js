var fs = require("fs");

var obterTudo = function( enderecoArquivo, funcaoSucesso, funcaoFalha ){

    var baseDados = require("../baseDados/login.json");

    if( typeof funcaoSucesso != "function" ){
        throw "É necessário passar uma função de sucesso como parâmetro";
    }

    if( typeof funcaoFalha != "function" ){
        throw "É necessário passar uma função de falha como parâmetro";
    }

    fs.readFile('servidor/baseDados/' + enderecoArquivo + '.json', function ( mensagemErro, baseDadosString ) {

        if( mensagemErro ){

            funcaoFalha( mensagemErro )
        } else {

            var baseDados = JSON.parse(baseDadosString);
            funcaoSucesso(baseDados);
        }
    });
};


var obterPorPropriedade = function( enderecoArquivo, nomePropriedade, valorPropriedade, funcaoSucesso, funcaoFalha ){

    var novaFuncaoSucesso = function(baseDados){

        var resposta = function(){
            var resposta = [];

            for( var indice = 0; indice < baseDados.length; indice++ )
            {
                var elemento = baseDados[indice];
                if( nomePropriedade in elemento ){
                    if( elemento[nomePropriedade] == valorPropriedade ){
                        resposta = elemento;
                        break;
                    }
                }
            }

            return resposta;
        }
        funcaoSucesso(resposta());
    };

    obterTudo( enderecoArquivo, novaFuncaoSucesso, funcaoFalha );
};


var obterPorId = function( enderecoArquivo, id, funcaoSucesso, funcaoFalha ){

    var novaFuncaoSucesso = function(){

        funcaoSucesso(baseDados[id]);
    };

    obterTudo( enderecoArquivo, novaFuncaoSucesso, funcaoFalha );
};

var atualizar = function( enderecoArquivo, dados, funcaoSucesso, funcaoFalha ){

    fs.writeFile('servidor/baseDados/' + enderecoArquivo + '.json', JSON.stringify(dados), function ( mensagemErro ) {

        if( mensagemErro ){

            funcaoFalha( mensagemErro )
        } else {
            obterTudo( enderecoArquivo, funcaoSucesso, funcaoFalha );
        }
    });
};

var inserir = function( enderecoArquivo, dados, funcaoSucesso, funcaoFalha ){

    var novaFuncaoSucesso = function(baseDados){

        var id = new Date().getTime();
        dados['id'] = id;
        baseDados.push( dados )
        atualizar( enderecoArquivo, baseDados, funcaoSucesso, funcaoFalha );
    };

    obterTudo( enderecoArquivo, novaFuncaoSucesso, funcaoFalha );
};

var alterar = function( enderecoArquivo, id, dados, funcaoSucesso, funcaoFalha ){

    var novaFuncaoSucesso = function(baseDados){

        baseDados.every( function(elemento){
            if( 'id' in elemento ){
                if( elemento.id == id ){
                    var indice = baseDados.indexOf(elemento);
                    baseDados[indice] = dados;
                    atualizar(enderecoArquivo, baseDados, funcaoSucesso, funcaoFalha);
                    return false;
                }
            }
            return true;
        });
    };

    obterTudo( enderecoArquivo, novaFuncaoSucesso, funcaoFalha );
};

var excluir = function( enderecoArquivo, id, funcaoSucesso, funcaoFalha ){

    var novaFuncaoSucesso = function(baseDados){

        baseDados.every( function(elemento){
            console.log(elemento)
            if( 'id' in elemento ){
                if( elemento.id == id ){
                    var indice = baseDados.indexOf(elemento);
                    baseDados.splice( indice, 1 );
                    atualizar(enderecoArquivo, baseDados, funcaoSucesso, funcaoFalha);
                    return false;
                }
            }
            return true;
        });
    };

    obterTudo( enderecoArquivo, novaFuncaoSucesso, funcaoFalha );
};

module.exports = {

    atualizar: atualizar,

    obterTudo: obterTudo,

    obterPorId: obterPorId,

    obterPorPropriedade: obterPorPropriedade,

    inserir: inserir,

    alterar: alterar,

    excluir: excluir

};


function ff(ob, callback){
    if(!err)
    return callback(true);
    else
    return callback(false)

}

var funcao = function(dados){
    console.log(dadas)
    return teste;
};

x = ff(novo, funcao);
gg(novo, funcao);