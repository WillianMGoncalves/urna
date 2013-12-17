var NavegacaoControles = function( escopo ){

    console.log('Iniciando controlador de navegação')
    escopo.modeloatual = "eleitores";

    socket.on('atualizar-chave', function( chave ){

        global.chave = chave;
    });

    socket.on('mensagem-erro-padrao', function( mensagemErro ){

        alert( mensagemErro );
    });

    socket.on('logout', function( mensagemErro ){

        alert( 'logout: ' + mensagemErro );
    });

};