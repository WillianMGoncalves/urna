/*global describe, require, it*/

var assert = require('assert'),
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver');

test.describe('Login', function() {
    test.it('Entrada', function() {
        var driver = new webdriver.Chrome(service_args=["--verbose"])

        var login = driver.findElement(webdriver.By.id('formulario-autenticacao-login'));
        login.sendKeys('webdriver');
        login.getAttribute('value').then(function(value) {
            assert.equal(value, 'webdriver');
        });

        driver.quit();
    });
});