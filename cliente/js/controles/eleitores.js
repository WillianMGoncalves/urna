var eleitoresControles = function(){

    var obterDadosFormulario = function(){

        return {
            id: "",
            nome: jQuery('.nome-eleitor:last').val(),
            cpf: jQuery('.cpf-eleitor:last').val(),
            titulo: jQuery('.titulo-eleitor:last').val()
        };
    }

    var demonstratodosEleitores = function( eleitores ){

        var templateListaEleitores = jQuery('#template-lista-eleitores').html();
        jQuery( '#lista-eleitores' ).html( $.tmpl( templateListaEleitores, eleitores ) );
    };

    socket.emit('eleitores-obter-tudo');

    socket.on('eleitores-obter-tudo', function( eleitores ){

        demonstratodosEleitores( eleitores );
    });

    jQuery(document).on('click','#visualizacao_eleitores', function(){

        socket.emit('eleitores-obter-tudo');
    });

    jQuery(document).on('click','#adicionar-eleitor', function(){

        var eleitor = {
            id: "",
            titulo: "Cadastrar Eleitor",
            nome: "",
            cpf: "",
            acao: "inserir-eleitor"
        };
        var cadastroEleitor = jQuery('#template-edicao-eleitor').html();
        jQuery("#edicao-eleitor").html( $.tmpl( cadastroEleitor, eleitor ) );
        jQuery("#modal-edicao-eleitor").modal('show');
    });

    jQuery(document).on('click','.editar-eleitor', function(){

        var idEleitor = this.id.split("-")[2];

        var eleitor = {
            id: idEleitor,
            titulo: "Editar Eleitor",
            nome: jQuery("#nome-eleitor-"+idEleitor).html(),
            cpf: jQuery("#cpf-eleitor-"+idEleitor).html(),
            acao: "alterar-eleitor"
        };

        var edicaoEleitor = jQuery('#template-edicao-eleitor').html();
        jQuery("#edicao-eleitor").html( $.tmpl( edicaoEleitor, eleitor ) );
        jQuery("#modal-edicao-eleitor").modal('show');
    });


    jQuery(document).on('click','#inserir-eleitor', function(){

        var dados = obterDadosFormulario();
        socket.emit('eleitores-inserir', dados );
    });

    jQuery(document).on('click','.excluir-eleitor', function(){

        var idEleitor = this.id.split("-")[2];
        socket.emit('eleitores-excluir', idEleitor );
    });

    jQuery(document).on('click','.alterar-eleitor', function(){

        var idEleitor = this.id.split("-")[2];
        var dados = obterDadosFormulario();
        dados['id'] = idEleitor;
        socket.emit('eleitores-alterar', dados );
    });

};
