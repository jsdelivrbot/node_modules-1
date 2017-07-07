// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter');
const defaultSeleniumAddress = 'http://127.0.0.1:4444/wd/hub';
const port= process.env.PORT || 8888;
const example_server= process.env.SERVER || '127.0.0.1';
const seleniumAddress = process.env.SELENIUM_ADDRESS || defaultSeleniumAddress;
const directConnect = seleniumAddress == defaultSeleniumAddress ? true : false;
exports.config = {
  allScriptsTimeout: 30000,
  seleniumAddress: seleniumAddress,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'firefox'
  },
  directConnect: directConnect,
  baseUrl: 'http://'+ example_server + ':' + port,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e'
    });
  },
  onPrepare: function() {
    jasmine.getEnv().addReporter(new SpecReporter());
  }
};
