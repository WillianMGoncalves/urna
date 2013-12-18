/*global require, module, console, verificarUsuarioLogado, realizarLogout*/

module.exports = function (socket, global) {
    "use strict";
    // Variáveis e bibliotecas

    var utils = require('./utils'),
        crud = require('../modelos/crud'),
        fs = require('fs'),

        // Utilitários
        //------------------------------

        // Executa esta função em caso de falha na requisição realizada pelo usuário

        falhaValidacaoRequisicao = function (mensagemErro) {

            socket.emit('falha-autenticacao', 'Ocorreu acesso indevido ao servidor!');
            console.log(mensagemErro);
        },

        // Função que returna uma função que será callback de uma solicitação
        // Do socket.io ela executa uma validacao na requisição antes de chamar
        // Outra função em caso de sucesso em caso de falha executa a função
        // "falhaValidacaoRequisicao"

        visualizarGlobal = function () {
            console.log("[GLOBAL]");
            console.log("---------------------------------");
            console.log("mesarios:", Object.keys(global.mesarios).length);
            console.log("urnas:", Object.keys(global.urnas).length);
            console.log("---------------------------------");
        },
        definicaoEvento = function (evento, funcaoSucessoRequisicao) {

            socket.on(evento, function (dados) {
                console.log("[Evento]_( " + evento + " )");
                console.log("---------------------------------");
                console.log("DADO:", dados);
                console.log("---------------------------------");
                visualizarGlobal();
                utils.validacaoRequisicoes(dados, funcaoSucessoRequisicao, falhaValidacaoRequisicao);
            });
        },

        enviarCliente = function (mensagem, dados) {

            var log = "[Comando]_( " + mensagem + " )\n---------------------------------\n";
            if (dados) {
                socket.emit(mensagem, dados);
                log += "DADO:\n" + JSON.stringify(dados) + "\n";
            } else {
                socket.emit(mensagem);
                console.log("SEM DADOS\n");
            }
            log += "---------------------------------\n";
            console.log(log);
            visualizarGlobal();
        },



        // Funções de uso do usuário
        //-------------------------------

        // Função responsável por criar e enviar uma chave
        // ao usuário recém

        enviarChaveParaUsuario = function () {

            var timestamp = new Date().getTime(),
                id = socket.id,
                chave = timestamp.toString().concat(id);

            global.usuariosOnline[id] = {
                chave: chave,
                socket: socket,
                tipo: 'nao-autenticado'
            };

            enviarCliente("atualizar-chave", chave);
        },

        // Função responsável por informar se o usuario é válido
        // de acordo com os dados de autenticação (login e senha) informados

        validarUsuario = function (dados, funcaoSucesso, funcaoFalha) {

            var procurarUsuarioValido = function (baseDados) {

                var usuarioValido;

                baseDados.every(function (elemento) {
                    if (elemento.hasOwnProperty('login') && elemento.hasOwnProperty('senha') && dados.hasOwnProperty('login') && dados.hasOwnProperty('senha')) {
                        if (elemento.login === dados.login && elemento.senha === dados.senha) {
                            usuarioValido = elemento;
                            return false;
                        }
                    }
                    return true;
                });

                funcaoSucesso(usuarioValido);
            };

            crud.obterTudo('login', procurarUsuarioValido, funcaoFalha);
        },

        //---------------------------------------------------------------
        // URNA

        disponibilizarUrna = function () {


            fs.readFile('cliente/htmls/urna.html', function (mensagemErro, paginaUrnaHtml) {

                var urnaAtual = global.urnas[socket.id],
                    mesario = global.mesarios[urnaAtual.mesario],
                    socketMesario = global.usuariosOnline[mesario.socket].socket,
                    paginaUrna = paginaUrnaHtml.toString(),
                    socketIdUrna,
                    socketUrna,
                    urnas = [],
                    urna,
                    todasUrnas = global.urnas,
                    numeroUrnas = 0;

                if (mensagemErro) {
                    falhaValidacaoRequisicao();
                } else {
                    for (socketIdUrna in todasUrnas) {
                        if (todasUrnas.hasOwnProperty(socketIdUrna)) {
                            socketUrna = global.usuariosOnline[socketIdUrna].socket;
                            urna = todasUrnas[socketIdUrna];
                            numeroUrnas = numeroUrnas + 1;
                            if (urna.mesario === urnaAtual.mesario) {
                                urnas.push({
                                    index: numeroUrnas,
                                    id: socket.id,
                                    ip: socketUrna.handshake.address.address,
                                    porta: socketUrna.handshake.address.port
                                });
                            }
                            if (numeroUrnas === Object.keys(global.urnas).length) {
                                enviarCliente("disponibilizar-aplicacao", paginaUrna.toString());
                                socketMesario.emit("obter-todas-urnas", urnas);
                            }
                        }
                    }
                }
            });
        },

        // MESARIO

        disponibilizarAplicacao = function () {
            var controles = ['administradores', 'eleitores', 'candidatos', 'partidos', 'coligacoes'],
                controlesSecao = require('./secao')(socket, global);

            fs.readFile('cliente/htmls/aplicacao.html', function (mensagemErro, aplicacao) {

                if (mensagemErro) {
                    falhaValidacaoRequisicao();
                } else {

                    enviarCliente("disponibilizar-aplicacao", aplicacao.toString());
                }
            });

            definicaoEvento("iniciar-eleicao", function () {
                global.eleicaoIniciada = true;
                console.log('-------------------------------------------');
                console.log('Início Eleição');
                console.log('-------------------------------------------');
                fs.readFile('cliente/htmls/monitor.html', function (mensagemErro, monitor) {

                    if (mensagemErro) {
                        falhaValidacaoRequisicao();
                    } else {
                        enviarCliente("disponibilizar-aplicacao", monitor.toString());
                    }
                });
            });

            definicaoEvento("obter-por-titulo-urna", function (dados) {

                var titulo = dados.titulo,
                    sucessoObtencaoPorTitulo = function (eleitor) {

                        console.log('Obtenção de eleitor por titulo ocorreu com Sucesso!');
                        var novosDados = {
                            titulo: dados.titulo,
                            urna: dados.urna,
                            eleitor: eleitor,
                            teste: 'ok'
                        };
                        socket.emit('atualizar-urna', novosDados);
                    },
                    falhaObtencaoPorTitulo = function (mensagemErro) {
                        console.log('Ocorreu uma falha na otenção de eleitor! Erro:');
                        console.log(mensagemErro);
                    };

                crud.obterPorPropriedade('eleitores', 'titulo', titulo, sucessoObtencaoPorTitulo, falhaObtencaoPorTitulo);
            });

            definicaoEvento("habilitar-voto", function (dados) {
                var urna = global.usuariosOnline[dados.urna];

                fs.readFile('cliente/htmls/votos.html', function (mensagemErro, paginaUrna) {

                    if (mensagemErro) {
                        falhaValidacaoRequisicao();
                    } else {
                        urna.socket.emit("disponibilizar-aplicacao", paginaUrna.toString());
                    }
                });
            });

            definicaoEvento("disconnect", function () {
                var ponteiroMesario,
                    mesario;

                for (ponteiroMesario in global.mesarios) {

                    if (global.mesarios.hasOwnProperty(ponteiroMesario)) {
                        console.log(ponteiroMesario);
                        mesario = global.mesarios[ponteiroMesario];
                        if (mesario.socket === socket.id) {
                            delete global.mesarios[ponteiroMesario];
                            break;
                        }
                    }
                }

            });

            definicaoEvento('secao-obter-tudo', controlesSecao.obterTudo);
            definicaoEvento('secao-atualizar', controlesSecao.atualizar);

            controles.forEach(function (nomeModelo) {

                var controlesModelo = require('./' + nomeModelo)(socket, global);
                definicaoEvento(nomeModelo + '-obter-tudo', controlesModelo.obterTudo);
                definicaoEvento(nomeModelo + '-inserir', controlesModelo.inserir);
                definicaoEvento(nomeModelo + '-alterar', controlesModelo.alterar);
                definicaoEvento(nomeModelo + '-excluir', controlesModelo.excluir);
            });

            definicaoEvento('realizar-logout', function () {
                realizarLogout();
            });
        },

        // LOGOUT

        realizarLogout = function () {

            enviarCliente('realizar-logout');
        },

        // Executa esta função em caso de sucesso na validação do usuario
        sucessoValidacaoUsuario = function (usuarioValido) {

            if (usuarioValido) {

                var tipoUsuario = verificarUsuarioLogado(usuarioValido);

                switch (tipoUsuario) {
                case "urna":
                    disponibilizarUrna();
                    break;
                case "mesario":
                    disponibilizarAplicacao();
                    break;
                case "usuario-ja-logado":
                    realizarLogout();
                    break;
                default:
                    break;
                }
            } else {
                enviarCliente('falha-autenticacao', 'Login ou senha inválidos!');
            }

        },

        // Executa esta função em caso de falha na validação do usuário
        falhaValidacaoUsuario = function (mensagemErro) {

            enviarCliente('falha-autenticacao', 'Ocorreu acesso indevido ao servidor!');
            console.log(mensagemErro);
        },

        // Executa esta função em caso de sucesso na requisição realizada pelo usuario

        sucessoValidacaoRequisicao = function (dadosAutenticacao) {

            validarUsuario(dadosAutenticacao, sucessoValidacaoUsuario, falhaValidacaoUsuario);
        };

        // Função que verifica o usuario já validado
        // informando ou se está logado ou retorna o tipo de acesso

//        verificarUsuarioLogado = function (dadosAutenticacao) {
//
//            var chave = global.usuariosOnline[socket.id].chave;
//            if (global.mesarios.hasOwnProperty(dadosAutenticacao.id)) {
//                if (global.eleicaoIniciada) {
//                    global.usuariosOnline[socket.id].tipo = "urna";
//                    global.urnas[socket.id] = {
//                        chave: chave,
//                        mesario: dadosAutenticacao.id
//                    };
//                    return "urna";
//                }
//                return "usuario-ja-logado";
//            }
//
//            global.usuariosOnline[socket.id].tipo = "mesario";
//            global.mesarios[dadosAutenticacao.id] = {
//                chave: chave,
//                socket: socket.id
//            };
//            return "mesario";
//        };

//-------------------------------------------------------
// Função executa quando usuario se conecta (socket.io)

    enviarChaveParaUsuario();

    definicaoEvento("autenticar-usuario", sucessoValidacaoRequisicao);

};