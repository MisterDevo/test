var assert = require('assert');
var test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver');

var options = {
  // server:'http://127.0.0.1:4444/wd/hub',
  // desiredCapabilities:{browserName:'firefox'},
  // baseUrl:'http://localhost:3000'
};
options = require('./wdjs-opt.js');

test.describe('TFTFT EndToEnd Test', function() {

    this.timeout(60000);
    var client = {};

    test.before(function(){
        client = new webdriver.Builder().
                          withCapabilities(options.desiredCapabilities).
                          usingServer(options.server).
                          build();
    });


    test.describe('verif title on first page', function() {
        test.it('should have the right title', function () {
            client.get(options.baseUrl);
            client.getTitle()
              .then(function(title){
                  assert.equal(title, 'TFTFT - Test For The First Time');
              });
            client.findElement(webdriver.By.id('project-link')).click();
        });
    });

    test.describe('mochawesome view', function() {
        test.it('should display correct mochawesome link', function () {
            client.findElement(webdriver.By.id('mochawesome-link'))
              .getAttribute('href')
              .then(function(attr){
                  assert.equal(attr,  options.baseUrl + '/#mochawesome');
              });
        });

        test.it('should display correct url in the view', function () {
            client.findElement(webdriver.By.id('mochawesome-link')).click();
            client.findElement(webdriver.By.id('frame-mochawesome'))
              .getAttribute('src')
              .then(function(attr){
                  assert.equal(attr,  options.baseUrl + '/report/tests.html');
              });
         });
    });

    test.describe('coverage view', function() {
        test.it('should display correct coverage link', function () {
            client.findElement(webdriver.By.id('coverage-link'))
              .getAttribute('href')
              .then(function(attr){
                  assert.equal(attr,  options.baseUrl + '/#coverage');
              });
        });

        test.it('should display correct url in the view', function () {
            client.findElement(webdriver.By.id('coverage-link')).click();
            client.findElement(webdriver.By.id('frame-coverage'))
              .getAttribute('src')
              .then(function(attr){
                  assert.equal(attr,  options.baseUrl + '/cov/lcov-report/index.html');
              });
         });
    });

    test.describe('saucelabs view', function() {
        test.it('should display correct saucelabs link', function () {
            client.findElement(webdriver.By.id('saucelabs-link'))
              .getAttribute('href')
              .then(function(attr){
                  assert.equal(attr,  options.baseUrl + '/#saucelabs');
              });
        });

        test.it('should display correct url in the view', function () {
            client.findElement(webdriver.By.id('saucelabs-link')).click();
            client.findElement(webdriver.By.id('sl-img'))
              .getAttribute('src')
              .then(function(attr){
                  assert.equal(attr, 'https://saucelabs.com/browser-matrix/misterdevo.svg');
              });
         });
    });

    var passed = true;
    test.afterEach(function() {
        if(this.currentTest.state === 'failed') {
          passed = false;
        }
    });

    test.after(function(done) {
        if(options.saucelabs){
          //options.saucelabs.getJobs(function (err, jobs) {
            //for (var k in jobs) {
              //if(jobs[k].tags[0]===options.desiredCapabilities.tags[0]){

              client.getSession().then(function (sessionid){
                options.saucelabs.updateJob(sessionid.id_, //jobs[k].id,
                                      { passed: passed },
                                      function(){ client.quit(); done(); });
              });
              //  break;
              //}
            //}
          //});
        } else {
            client.quit();
            done();
        }
    });
});