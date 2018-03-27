/** (c) Walgreen Co. All rights reserved.**/
import path from 'path';
import fs from 'fs';
import async from 'async';
import YAML from 'yamljs';
import _ from 'underscore';

var serverMode = process.env.ENV_SERVER;

var configObj = null;

async.parallel({
	moduleConfig: function(callback) {
		let appConfigFileName = '../../config/app-config.json';
		let envConfigFileName = '../../config/env/' + serverMode + '/config.yaml';
		getConfigObj(appConfigFileName, envConfigFileName, function(configObjModuleJson) {
			callback(null, configObjModuleJson);
		});
	}
}, function(err, results) {
	configObj = Object.assign({}, results.moduleConfig);
});

function getConfigObj(appConfigFileName, envConfigFileName, callback) {
	let appConfigFilePath = path.join(__dirname, appConfigFileName);
	if (fs.existsSync(appConfigFilePath)) {
		let configObjModuleJson = fs.readFileSync(appConfigFilePath, 'utf8');
		let matchRegex = /(\${ENV_.*?\})/g;
		let parameterizedProps = _.uniq(configObjModuleJson.match(matchRegex));
		let envConfigFilePath = path.join(__dirname, envConfigFileName);
		let envConfigYAML = null;
		if (process.env.ENV_DEPLOYMENT_TYPE !== 'ACS' && fs.existsSync(envConfigFilePath)) {
			envConfigYAML = YAML.load(envConfigFilePath);
		}
		async.each(parameterizedProps, function(value, callbackFunction) {
			var envProp = value.substring(2, value.length - 1);
			var replaceRegex = new RegExp(value.replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&'), 'g');
			if (process.env.ENV_DEPLOYMENT_TYPE === 'ACS') {
				configObjModuleJson = configObjModuleJson.replace(replaceRegex, process.env[envProp]);
			} else {
				configObjModuleJson = configObjModuleJson.replace(replaceRegex, envConfigYAML.data[envProp]);
			}
			callbackFunction();
		}, function() {
			callback(JSON.parse(configObjModuleJson));
		});
	}
};

exports.configManagerObj = configObj;
