var coligacoesControles = function(){

    var obterDadosFormulario = function(){

        return {
            id: "",
            nome: jQuery('.nome-coligacao').val(),
            cpf: jQuery('.cpf-coligacao').val()
        };
    }

    var demonstratodosColigacoes = function( coligacoes ){

        var templateListaColigacoes = jQuery('#template-lista-coligacoes').html();
        jQuery( '#lista-coligacoes' ).html( $.tmpl( templateListaColigacoes, coligacoes ) );
    };

    socket.emit('coligacoes-obter-tudo');

    socket.on('coligacoes-obter-tudo', function( coligacoes ){

        demonstratodosColigacoes( coligacoes );
    });

    jQuery(document).on('click','#visualizacao_coligacoes', function(){

        socket.emit('coligacoes-obter-tudo');
    });

    jQuery(document).on('click','#adicionar-coligacao', function(){

        var coligacao = {
            id: "",
            titulo: "Cadastrar Coligacao",
            nome: "",
            cpf: "",
            acao: "inserir-coligacao"
        };
        var cadastroColigacao = jQuery('#template-edicao-coligacao').html();
        jQuery("#edicao-coligacao").html( $.tmpl( cadastroColigacao, coligacao ) );
        jQuery("#modal-edicao-coligacao").modal('show');
    });

    jQuery(document).on('click','.editar-coligacao', function(){

        var idColigacao = this.id.split("-")[2];

        var coligacao = {
            id: idColigacao,
            titulo: "Editar Coligacao",
            nome: jQuery("#nome-coligacao-"+idColigacao).html(),
            cpf: jQuery("#cpf-coligacao-"+idColigacao).html(),
            acao: "alterar-coligacao"
        };

        var edicaoColigacao = jQuery('#template-edicao-coligacao').html();
        jQuery("#edicao-coligacao").html( $.tmpl( edicaoColigacao, coligacao ) );
        jQuery("#modal-edicao-coligacao").modal('show');
    });


    jQuery(document).on('click','#inserir-coligacao', function(){

        var dados = obterDadosFormulario();
        socket.emit('coligacoes-inserir', dados );
    });

    jQuery(document).on('click','.excluir-coligacao', function(){

        var idColigacao = this.id.split("-")[2];
        socket.emit('coligacoes-excluir', idColigacao );
    });

    jQuery(document).on('click','.alterar-coligacao', function(){

        var idColigacao = this.id.split("-")[2];
        var dados = obterDadosFormulario();
        dados['id'] = idColigacao;
        socket.emit('coligacoes-alterar', dados );
    });

};
