const util   = require('util');
const crypto = require('crypto');

var ObjectId = require('mongodb').ObjectID;

var tools = require('./tools');

module.exports = function(app, db) {

	var bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
	   extended: true
	}));

	upload = require('express-fileupload');
	app.use(upload());

	app.get('/', async function(req,res){
		
		try {
			var hash_obj = await tools.checkHash(req,res);
			
			res.render('start',{hash_obj:hash_obj});
		} catch(e) {
			console.log('Error '+e);
		}
	})

	app.get('/registration',function(req,res){
		(async function() {
			try {
				var hash_obj = await tools.checkHash(req,res);

				res.render('registration',{hash_obj:hash_obj});
			} catch(e) {
				console.log(e);
			}
		})()

	})

	app.get('/login',function(req,res){
		(async function() {
			try {
				var hash_obj = await tools.checkHash(req,res);

				res.render('login',{hash_obj:hash_obj});
			} catch(e) {
				console.log(e);
			}
		})()
	})

	return app

}