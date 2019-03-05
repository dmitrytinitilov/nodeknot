var http = require('http');
var url  = require('url');
var fs = require('fs');
var path = require('path');
const crypto = require('crypto');

var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
app.use(express.static('public'));

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine','pug');

var mongo = require('mongodb');
var host  = 'localhost';
var port  = 27017;
var ObjectId = require('mongodb').ObjectID;


(async function() {

	try {
		var getDb = require('./dbs');
		db = await getDb();

		var routes = require('./routes');
		app = routes(app, db);

		var api = require('./api');
		app = api(app, db);

		var server = app.listen(3086,function(){
			var host = server.address().address;
			var port = server.address().port;

			console.log("Server running at http://%s:%s", host, port)
		})
	} catch(e) {
		console.log(e);
	}

})()