var inicializarAplicacao = function(socket){

    jQuery(document).on('click','#realizar-logout',function(){
        socket.emit('realizar-logout');
    });

    socket.on('realizar-logout',function(){
        alert('logout');
        location = location.origin;
    });

    socket.on('falha-autenticacao',function( mensagemErro ){

        alert( mensagemErro );
    });

    // Iniciando Controles
    administradoresControles();
    eleitoresControles();
    candidatosControles();
    partidosControles();
    coligacoesControles();
    secaoControles();
    eleicaoControle();

};