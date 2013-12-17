var secaoControles = function(){

    var obterDadosFormulario = function(){

        return {
            nome: jQuery(".nome-secao").val(),
            zona: jQuery(".zona-secao").val(),
            municipio: jQuery(".municipio-secao").val()
        };
    };

    var demonstrarDadosSecao = function( dadosSecao ){

        var templateDadosSecao = jQuery('#template-dados-secao').html();
        jQuery( '#dados-secao' ).html( $.tmpl( templateDadosSecao, dadosSecao ) );
    };

    socket.emit('secao-obter-tudo');

    socket.on('secao-obter-tudo', function( dadosSecao ){

        demonstrarDadosSecao( dadosSecao );
    });

    jQuery(document).on('click','#visualizacao_secao', function(){

        socket.emit('secao-obter-tudo');
    });

    jQuery(document).on('click','#editar-secao', function(){

        var secao = {
            nome: jQuery("#nome-secao").html(),
            zona: jQuery("#zona-secao").html(),
            municipio: jQuery("#municipio-secao").html()
        };

        var edicaoSecao = jQuery('#template-edicao-secao').html();
        jQuery("#edicao-secao").html( $.tmpl( edicaoSecao, secao ) );
        jQuery("#modal-edicao-secao").modal('show');
    });


    jQuery(document).on('click','#alterar-secao', function(){

        var dados = [obterDadosFormulario()];
        socket.emit('secao-atualizar', dados );
    });

};
