var partidosControles = function(){

    var obterDadosFormulario = function(){

        return {
            id: "",
            nome: jQuery('.nome-partido').val(),
            cpf: jQuery('.cpf-partido').val()
        };
    }

    var demonstratodosPartidos = function( partidos ){

        var templateListaPartidos = jQuery('#template-lista-partidos').html();
        jQuery( '#lista-partidos' ).html( $.tmpl( templateListaPartidos, partidos ) );
    };

    socket.emit('partidos-obter-tudo');

    socket.on('partidos-obter-tudo', function( partidos ){

        demonstratodosPartidos( partidos );
    });

    jQuery(document).on('click','#visualizacao_partidos', function(){

        socket.emit('partidos-obter-tudo');
    });

    jQuery(document).on('click','#adicionar-partido', function(){

        var partido = {
            id: "",
            titulo: "Cadastrar Partido",
            nome: "",
            cpf: "",
            acao: "inserir-partido"
        };
        var cadastroPartido = jQuery('#template-edicao-partido').html();
        jQuery("#edicao-partido").html( $.tmpl( cadastroPartido, partido ) );
        jQuery("#modal-edicao-partido").modal('show');
    });

    jQuery(document).on('click','.editar-partido', function(){

        var idPartido = this.id.split("-")[2];

        var partido = {
            id: idPartido,
            titulo: "Editar Partido",
            nome: jQuery("#nome-partido-"+idPartido).html(),
            cpf: jQuery("#cpf-partido-"+idPartido).html(),
            acao: "alterar-partido"
        };

        var edicaoPartido = jQuery('#template-edicao-partido').html();
        jQuery("#edicao-partido").html( $.tmpl( edicaoPartido, partido ) );
        jQuery("#modal-edicao-partido").modal('show');
    });


    jQuery(document).on('click','#inserir-partido', function(){

        var dados = obterDadosFormulario();
        socket.emit('partidos-inserir', dados );
    });

    jQuery(document).on('click','.excluir-partido', function(){

        var idPartido = this.id.split("-")[2];
        socket.emit('partidos-excluir', idPartido );
    });

    jQuery(document).on('click','.alterar-partido', function(){

        var idPartido = this.id.split("-")[2];
        var dados = obterDadosFormulario();
        dados['id'] = idPartido;
        socket.emit('partidos-alterar', dados );
    });

};
