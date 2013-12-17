var candidatosControles = function(){

    var obterDadosFormulario = function(){

        return {
            id: "",
            nome: jQuery('.nome-candidato:last').val(),
            cpf: jQuery('.cpf-candidato:last').val(),
            numero: jQuery('.numero-candidato:last').val(),
            partido: jQuery('.partido-candidato:last').val()
        };
    }

    var demonstratodosCandidatos = function( candidatos ){

        var templateListaCandidatos = jQuery('#template-lista-candidatos').html();
        jQuery( '#lista-candidatos' ).html( $.tmpl( templateListaCandidatos, candidatos ) );
    };

    socket.emit('candidatos-obter-tudo');

    socket.on('candidatos-obter-tudo', function( candidatos ){

        demonstratodosCandidatos( candidatos );
    });

    jQuery(document).on('click','#visualizacao_candidatos', function(){

        socket.emit('candidatos-obter-tudo');
    });

    jQuery(document).on('click','#adicionar-candidato', function(){

        var candidato = {
            id: "",
            titulo: "Cadastrar Candidato",
            nome: "",
            cpf: "",
            acao: "inserir-candidato"
        };
        var cadastroCandidato = jQuery('#template-edicao-candidato').html();
        jQuery("#edicao-candidato").html( $.tmpl( cadastroCandidato, candidato ) );
        jQuery("#modal-edicao-candidato").modal('show');
    });

    jQuery(document).on('click','.editar-candidato', function(){

        var idCandidato = this.id.split("-")[2];

        var candidato = {
            id: idCandidato,
            titulo: "Editar Candidato",
            nome: jQuery("#nome-candidato-"+idCandidato).html(),
            cpf: jQuery("#cpf-candidato-"+idCandidato).html(),
            acao: "alterar-candidato"
        };

        var edicaoCandidato = jQuery('#template-edicao-candidato').html();
        jQuery("#edicao-candidato").html( $.tmpl( edicaoCandidato, candidato ) );
        jQuery("#modal-edicao-candidato").modal('show');
    });


    jQuery(document).on('click','#inserir-candidato', function(){

        var dados = obterDadosFormulario();
        socket.emit('candidatos-inserir', dados );
    });

    jQuery(document).on('click','.excluir-candidato', function(){

        var idCandidato = this.id.split("-")[2];
        socket.emit('candidatos-excluir', idCandidato );
    });

    jQuery(document).on('click','.alterar-candidato', function(){

        var idCandidato = this.id.split("-")[2];
        var dados = obterDadosFormulario();
        dados['id'] = idCandidato;
        socket.emit('candidatos-alterar', dados );
    });

};
