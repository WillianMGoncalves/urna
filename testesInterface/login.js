/*global describe, require, it, before*/

var assert = require('assert'),
    webdriver = require('selenium-webdriver'),driver;

// tests
describe('Login', function() {
    it('Campos', function(done) {

        var webdriver = require('selenium-webdriver');

        var driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();

        driver.get('http://urna.herokuapp.com/');

        var searchBox = driver.findElement(webdriver.By.id('formulario-autenticacao-login'));
        searchBox.sendKeys('webdriver\n').then(function() {
            return searchBox.getAttribute('value');
        }).then(function (value) {
                    assert.equal(value, 'webxdriver');
                    done();
                });
    });
});