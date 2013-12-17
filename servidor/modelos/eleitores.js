var obterPortitulo = function( enderecoArquivo, titulo, dados, funcaoSucesso, funcaoFalha ){

    var novaFuncaoSucesso = function(baseDados){

        baseDados.every( function(elemento){
            if( 'titulo' in elemento ){
                if( elemento.titulo == titulo ){
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
