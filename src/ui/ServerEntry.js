import React from 'react';
import { renderToString } from 'react-dom/server';

import { commonAPI as app, startServer } from '../util/ExpressJSUtils.js';
import { configManagerObj } from '../util/ConfigManager.js';

import {HelloWorld} from './components/helloWorld/helloWorld';

const PORT = configManagerObj.env_config_server_port;

const healthInfoURL = '/browseapp/v1/api/health';
app.get(healthInfoURL, function(req, res) {
	var responseData = { 'status': 'UP', 'healthInfo': { 'status': 'UP', 'appName': 'browse-app API Service' } };
	res.send(responseData);
});

const pageURL = '/helloworld';
app.get(pageURL, function(req, res) {
	let htmlString = renderToString(<HelloWorld/>);
	res.send(htmlString);
});

startServer(app, PORT, function() {
});
