// Módulos e Dependências
var express = require('express'),
    ejs = require('ejs'),
    http = require('http'),
    app = express(),
    socketIO = require('socket.io');

// Configurações Globais (Express)
app.configure(function(){
    app.engine('.html', ejs.renderFile );
    app.use(express.bodyParser());
    app.use(express.static('public'));
    app.set('views', __dirname + '/cliente/htmls');
    app.set('port', process.env.PORT || 4000);
});

// Configurações do Ambiente de Desenvolvimento (Express)
app.configure('development', function(){
});

// Configuração do Ambiente de Produção (Express)
app.configure('production', function(){
});

// Configuração das Rotas (Express)
app.get('/',function(req,res){
    res.render('login.html');
});

// Iniciando Socket.io sincronizado com Express
var servidor = http.createServer(app).listen(app.get('port'),'localhost',
    function(){
        console.log("Servidor iniciado na porta: " + app.get('port'));
    }
);

// Socket IO

socketIO = socketIO.listen(servidor);

// Variáveis em escopo que é possível ser acessada por qualquer usuário
// Conforme a necessidade ( definida pelo sistema )

global = {

    usuariosOnline: [],
    mesarios: [],
    urnas: [],
    eleicaoIniciada: false
};


socketIO.on('connection', function( socket ){

    var conexao = require('./servidor/controles/conexao');
    conexao( socket );
});