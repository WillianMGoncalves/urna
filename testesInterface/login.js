/*global exports, buster*/

"use strict";

exports.name = "Tela Login";

exports.tests = [{

    name: "Verifica se a página possui título",
    func: function (done) {

        exports.driver
            .getTitle(function (title) {
                buster.assertions.assert(title.indexOf('Urna Eletrônica') !== -1);
            })
            .end(done);
    }}
];