var SauceLabs = require("saucelabs");
var saucelabs = new SauceLabs({
            username: process.env.SAUCE_USERNAME,
            password: process.env.SAUCE_ACCESS_KEY
          });

module.exports = {
        host: 'ondemand.saucelabs.com',
        port: 80,
        user: process.env.SAUCE_USERNAME,
        key: process.env.SAUCE_ACCESS_KEY,

        saucelabs: saucelabs,

        logLevel: 'silent',

        baseUrl:'https://tftft-misterdevo.c9users.io',

        // ChromeBrowser: {
        //     desiredCapabilities: {
        //         browserName: 'chrome',
        //         version: '48.0',
        //         platform: 'Windows 10'
        //     }
        // },
        // FirefoxBrowser: {
        //     desiredCapabilities: {
        //         browserName: 'firefox',
        //         version: '44.0',
        //         platform: 'Windows 10'
        //     }
        // },
        //
        // desiredCapabilities: {
        //     browserName: 'chrome',
        //     version: '47.0',
        //     platform: 'OS X 10.11',
        //     tags: ['TFTFT'],
        //     name: 'TFTFT',
        //     build: 'build-1.0.1',
        //     passed: 'false',
        //
        //     'public': true
        // }

        desiredCapabilities: {
            browserName: (process.env._BROWSER || '').replace(/_/g, ' '),
            platform: (process.env._PLATFORM || '').replace(/_/g, ' '),
            version: process.env._VERSION,

            tags: [process.env.TRAVIS_JOB_NUMBER],
            name: 'TFTFT-' + process.env.TRAVIS_JOB_NUMBER,
            build: process.env.TRAVIS_BUILD_NUMBER,
            passed: 'false',

            'public': true
        }

    }