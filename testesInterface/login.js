/*global describe, require, it, before*/

var assert = require('assert')
    , fs = require('fs')
    , webdriver = require('selenium-webdriver')
    , colors = require('colors');

var driver;

// tests
describe('Login', function() {
    it('Campos', function(done) {

        driver = new webdriver
            .Builder()
            .usingServer('http://urna.herokuapp.com')
            .withCapabilities(
            {
                'browserName': 'chrome'
            })
            .build();
        var searchBox = driver.findElement(webdriver.By.id('formulario-autenticacao-login'));
        searchBox.sendKeys('webdriver\n').then(function() {
            return searchBox.getAttribute('value');
        }).then(function(value) {
                assert.equal(value, 'webxdriver');
                done();
            });
    });
});