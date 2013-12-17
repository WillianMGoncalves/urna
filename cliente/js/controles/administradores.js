var administradoresControles = function(){

    var obterDadosFormulario = function(){

        return {
            id: "",
            nome: jQuery('.nome-administrador').val(),
            cpf: jQuery('.cpf-administrador').val()
        };
    }

    var demonstratodosAdministradores = function( administradores ){

        var templateListaAdministradores = jQuery('#template-lista-administradores').html();
        jQuery( '#lista-administradores' ).html( $.tmpl( templateListaAdministradores, administradores ) );
    };

    socket.emit('administradores-obter-tudo');

    socket.on('administradores-obter-tudo', function( administradores ){

        demonstratodosAdministradores( administradores );
    });

    jQuery(document).on('click','#visualizacao_administradores', function(){

        socket.emit('administradores-obter-tudo');
    });

    jQuery(document).on('click','#adicionar-administrador', function(){

        var administrador = {
            id: "",
            titulo: "Cadastrar Administrador",
            nome: "",
            cpf: "",
            acao: "inserir-administrador"
        };
        var cadastroAdministrador = jQuery('#template-edicao-administrador').html();
        jQuery("#edicao-administrador").html( $.tmpl( cadastroAdministrador, administrador ) );
        jQuery("#modal-edicao-administrador").modal('show');
    });

    jQuery(document).on('click','.editar-administrador', function(){

        var idAdministrador = this.id.split("-")[2];

        var administrador = {
            id: idAdministrador,
            titulo: "Editar Administrador",
            nome: jQuery("#nome-administrador-"+idAdministrador).html(),
            cpf: jQuery("#cpf-administrador-"+idAdministrador).html(),
            acao: "alterar-administrador"
        };

        var edicaoAdministrador = jQuery('#template-edicao-administrador').html();
        jQuery("#edicao-administrador").html( $.tmpl( edicaoAdministrador, administrador ) );
        jQuery("#modal-edicao-administrador").modal('show');
    });


    jQuery(document).on('click','#inserir-administrador', function(){

        var dados = obterDadosFormulario();
        socket.emit('administradores-inserir', dados );
    });

    jQuery(document).on('click','.excluir-administrador', function(){

        var idAdministrador = this.id.split("-")[2];
        socket.emit('administradores-excluir', idAdministrador );
    });

    jQuery(document).on('click','.alterar-administrador', function(){

        var idAdministrador = this.id.split("-")[2];
        var dados = obterDadosFormulario();
        dados['id'] = idAdministrador;
        socket.emit('administradores-alterar', dados );
    });

};
