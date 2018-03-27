const express = require('express');
const cluster = require('cluster');
const bodyParser = require('body-parser');
const compression = require('compression');

/**
 * ExpressJSUtils module.
 * @module ui/util/ExpressJSUtils
 */

const app = express();
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'Content-Type');
	next();
});

app.use(compression());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

var startServer = (expressApp, port, callback) => {
	if (cluster.isMaster) {
		const numCPUs = require('os').cpus().length;
		console.log(`Master ${process.pid} is running`);// eslint-disable-line
	  	for (let i = 0; i < numCPUs; i++) {
			cluster.fork();
	  	}
		cluster.on('exit', () => {
			cluster.fork();
		});
	} else {
		expressApp.listen(port, function() {
			console.log(`Fork ${process.pid} is running in ${port} port`);// eslint-disable-line
			callback();
		});
	}
};

exports.commonAPI = app;
exports.startServer = startServer;
