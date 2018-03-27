var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
const BASE_URL = browser.params.baseURL;
chai.use(chaiAsPromised);
var expect = chai.expect;
var origFn = browser.driver.controlFlow().execute;
/**
 * Create a web browser driver.
 * @param {object} driver - The driver value.
 * @return {object} The browser control.
 */
browser.driver.controlFlow().execute = function() {
	var args = arguments;
	origFn.call(browser.driver.controlFlow(), function() {
		return protractor.promise.delayed(3000);
	});
	return origFn.apply(browser.driver.controlFlow(), args);
};

/**
 * Represents export modules server.
 * @returns {object} - Return root functional test in web browser
 */
module.exports = function() {
	this.setDefaultTimeout(60 * 3000);
	this.Given(/^Customer open Boiler plate page \"([^\"]*)\"$/, function(url) {
		
		console.log(BASE_URL + url);
		browser.get(BASE_URL + url);
	});
	this.When(
		/^Customer check the Walgreens UI microservices Boilerplate text in home$/,
		function() {
			expect(element(by.css(".one")).isDisplayed()).to.eventually.be
				.true;
			return browser.driver.sleep(1000);
		}
	);
};
