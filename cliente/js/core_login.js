socket = io.connect();

var global = {

    chave: null
};

jQuery(document).ready( function(){

    // Eventos do socket io

    socket.on('atualizar-chave',function( chave ){

        global.chave = chave;
        console.log( chave );
    });

    socket.on('disponibilizar-aplicacao',function( aplicacao ){

        jQuery("#app").html(aplicacao);
        inicializarAplicacao(socket);
    });

    socket.on('falha-autenticacao',function( mensagemErro ){

        alert( mensagemErro );
    });

    // Eventos do formulário

    // Formulário Autenticação
    jQuery(document).on('submit','#formulario-autenticacao',function(evento){

        evento.preventDefault();
        var dados = {

            login: jQuery('#formulario-autenticacao-login').val(),
            senha: jQuery('#formulario-autenticacao-senha').val()
        };
        socket.emit('autenticar-usuario',dados);

        return false;
    });

});