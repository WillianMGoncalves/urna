module.exports = function(grunt){

    var configuracoes = require('./servidor/configuracoes/configuracoes');
    var async = require('async');


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
        },
        jade: {
            compile: {
                options: {
                    data: function( destino, origem ){

                        return configuracoes.pagina;
                    }
                },
                files: {
                    'cliente/htmls/login.html': 'servidor/visoes/login.jade',
                    'cliente/htmls/aplicacao.html': 'servidor/visoes/aplicacao.jade',
                    'cliente/htmls/monitor.html': 'servidor/visoes/monitor.jade',
                    'cliente/htmls/urna.html': 'servidor/visoes/urna.jade',
                    'cliente/htmls/votos.html': 'servidor/visoes/votos.jade'
                }
            }
        },
        concat: {
//            options:{
//                banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
//                    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
//                    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
//                    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
//                    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
//            },
            css: {
                files: {
                    'cliente/min/styles_login.min.css': [
                        'cliente/plugins/bootstrap/css/bootstrap.min.css',
                        'cliente/plugins/bootstrap/css/bootstrap-responsive.min.css'
                    ],
                    'cliente/min/styles_aplicacao.min.css': [
                        'cliente/plugins/bootstrap/css/bootstrap.min.css',
                        'cliente/plugins/bootstrap/css/bootstrap-responsive.min.css',
                        'cliente/css/visualizadores.css'
                    ]
                }
            },
            js: {
                files: {
                    'cliente/min/scripts_login.min.js': [
                        'cliente/plugins/jquery/jquery-2.0.3.js',
                        'cliente/plugins/bootstrap/js/bootstrap.js',
                        'cliente/plugins/crypto_js/rollups/sha512.js',
                        'cliente/plugins/crypto_js/rollups/aes.js',
                        'cliente/plugins/crypto_js/components/pad-nopadding.js',
                        'cliente/plugins/socket_io/socket.js',
                        'cliente/plugins/urna/json.js',
                        'cliente/js/core_login.js'
                    ],
                    'cliente/min/scripts_aplicacao.min.js': [
                        'cliente/plugins/jquery/jquery-2.0.3.js',
                        'cliente/plugins/jquery/jquery.tmpl.js',
                        'cliente/plugins/bootstrap/js/bootstrap.js',
                        'cliente/plugins/crypto_js/rollups/sha512.js',
                        'cliente/plugins/crypto_js/rollups/aes.js',
                        'cliente/plugins/crypto_js/components/pad-nopadding.js',
                        'cliente/plugins/socket_io/socket.js',
                        'cliente/plugins/urna/json.js',

                        'cliente/js/controles/administradores.js',
                        'cliente/js/controles/eleitores.js',
                        'cliente/js/controles/candidatos.js',
                        'cliente/js/controles/partidos.js',
                        'cliente/js/controles/coligacoes.js',
                        'cliente/js/controles/secao.js',
                        'cliente/js/controles/eleicao.js',

                        'cliente/js/core_login.js',
                        'cliente/js/core_aplicacao.js'
                    ]
                }
            }
        },
        cssmin: {
            css: {
                files: {
                    'cliente/min/styles_login.min.css': ['cliente/min/styles_login.min.css'],
                    'cliente/min/styles_aplicacao.min.css': ['cliente/min/styles_aplicacao.min.css']
                }
            }
        },
        uglify: {
            js: {
                files: {
                    'cliente/min/scripts_login.min.js': ['cliente/min/scripts_login.min.js'],
                    'cliente/min/scripts_aplicacao.min.js': ['cliente/min/scripts_aplicacao.min.js']
                }
            }
        },
        prettify: {
            js: {
                files: {
                    'cliente/min/scripts_login.min.js': ['cliente/min/scripts_login.min.js'],
                    'cliente/min/scripts_aplicacao.min.js': ['cliente/min/scripts_aplicacao.min.js']
                }
            }
        },
        mochaTest: {
            mochaTest: {
                options: {
                    reporter: 'spec'
                },
                src: ['testes/*.js']
            }
        },
        jshint: {
            options:{
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            servidorJs: ['testes/*.js','servidor/controles/*.js']
        }
//        watch: {
//            options: {
//                livereload: true
//            }
//        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('deploy', ['jshint:servidorJs','mochaTest:mochaTest','concat:css','cssmin:css','concat:js','uglify:js','jade:compile']);
    grunt.registerTask('pages', ['jade:compile']);

    grunt.registerTask('default',[]);

}
