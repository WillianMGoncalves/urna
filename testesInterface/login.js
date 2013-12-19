/*global describe, require, it, before*/

var assert = require('assert'),
    webdriver = require('selenium-webdriver'),driver;

// tests
describe('Login', function() {
    it('Campos', function(done) {

        var valido = false;
        var webdriver = require('selenium-webdriver');

        var driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();

        driver.get('http://urna.herokuapp.com/');

        var login = driver.findElement(webdriver.By.id('formulario-autenticacao-login'));
        var senha = driver.findElement(webdriver.By.id('formulario-autenticacao-senha'));

        login.sendKeys('1').then(function () {
            return login.getAttribute('value');
        }).then(function (valorLogin) {
                    senha.sendKeys('1').then(function () {
                        return senha.getAttribute('value');
                    }).then(function (valorSenha) {
                                assert.equal(valorSenha, '1');
                                done();
                            });
                })
        driver.quit();
    });
});