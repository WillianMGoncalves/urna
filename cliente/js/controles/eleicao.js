var eleicaoControle = function(){

    socket.on("obter-todas-urnas", function(urnas){

        console.log(urnas);
        var templateListaUrnas = jQuery('#template-lista-urnas').html();
        jQuery( '#lista-urnas' ).html( $.tmpl( templateListaUrnas, urnas ) );

    });

    socket.on("atualizar-urna",function( urna ){
        if( urna.length ){
            var idEleitorUrna = this.id.split("-")[3];
            var titulo = jQuery(".titulo-eleitor-urna:last").val();
            socket.emit('habilitar-voto',urna);
        } else {
            alert("Eleitor Inexistente");
        }
    });

    jQuery(document).on('click','#iniciar-eleicao', function(){

        console.log('eleicao iniciada')
        socket.emit('iniciar-eleicao');
    });

    jQuery(document).on('click','.inserir-eleitor-urna', function(){

        var idEleitorUrna = this.id.split("-")[3];

        var eleitor = {
            urna: idEleitorUrna,
            titulo: "Selecionar Eleitor"
        };

        var edicaoEleitor = jQuery('#template-selecao-eleitor-urna').html();
        jQuery("#selecao-eleitor-urna").html( $.tmpl( edicaoEleitor, eleitor ) );
        jQuery("#modal-selecao-eleitor-urna").modal('show');

    });

    jQuery(document).on('click','.fechar_modais',function(){
        jQuery('.in').removeClass();
    });

    jQuery(document).on('click','.pesquisa-eleitor-urna',function(){
        var idEleitorUrna = this.id.split("-")[3];
        var titulo = jQuery(".titulo-eleitor-urna:last").val();
        var dados = {
            urna: idEleitorUrna,
            titulo: titulo
        };
        socket.emit("obter-por-titulo-urna",dados);
    });

    jQuery(document).on('click','.selecao-eleitor-urna',function(){
        var idEleitorUrna = this.id.split("-")[3];
        var titulo = jQuery(".titulo-eleitor-urna:last").val();
        var dados = {
            urna: idEleitorUrna,
            titulo: titulo
        };
        socket.emit('habilitar-voto',dados);
    });

    jQuery(document).on('click','#voto-pesquisar',function(){
        alert('pesquisar')
    });

    jQuery(document).on('click','#voto-confirmar',function(){
    });

    jQuery(document).on('click','#voto-corrigir',function(){
        alert('corrigir')
    });

};
