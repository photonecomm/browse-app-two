/** (c) Walgreen Co. All rights reserved.**/
let functionalTestURL = 'http://localhost:8080';
exports.config = {
	seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
	getPageTimeout: 9000,
	allScriptsTimeout: 9000,
	framework: 'custom',
	frameworkPath: require.resolve('../../node_modules/protractor-cucumber-framework'),
	ignoreUncaughtExceptions: true,
	capabilities: {
		'browserName': 'chrome',
		'chromeOptions': {
			'args': ['--disable-web-security', '--headless', '--disable-gpu', '--window-size=1280,1024', 'no-sandbox']
		}
	},
	onPrepare: function() {
		browser.ignoreSynchronization = true;
	},
	params: {
		baseURL: functionalTestURL
	},
	specs: ['features/*.feature'],
	exclude: ['features/*-d.feature'],
	cucumberOpts: {
		format: ['json:test/functional/reports/json/results.json', 'pretty'],
		require: ['features/step_definitions/*.js'],
		tags: false,        
		profile: false,
		'no-source': true,
		keepAlive: false,
		strict: true
	}
};  