const util   = require('util');
const crypto = require('crypto');

var ObjectId = require('mongodb').ObjectID;

var tools = require('./tools');

module.exports = function(app, db) {

	app.post('/api/template',async function(req,res){
		
		try {
			res.end('template');
		} catch(e) {
			console.log(e);
			res.end('error');
		}
	
	})

	app.get('/api/logout',async function(req,res){
	
		try {

			res.clearCookie('hash');

			res.end('{result:ok}');
		} catch(e) {
			res.end('{result:error}');
		}
		
	})

	app.post('/api/register',async function(req,res){
		
		try {

			var invite = req.body.invite;
			var login  = req.body.login.toLowerCase();
			var password = req.body.password;

			var loginpass = db.collection("loginpass");

			if (login && password) {
				const crypto_password = crypto.createHmac('sha256', password)
                   .update(login)
                   .digest('hex');

				await loginpass.insertOne({login:login,password:crypto_password})
				res.end('{result:added}');
			} else {
				res.end('{result:no_data_error}');
			}

		} catch(e) {
			console.log(e);
			res.end('{result:error}');
		}
	})

	app.post('/api/login',async function(req,res){
		
		try {
			var login  = req.body.login.toLowerCase();
			var password = req.body.password;

			var loginpass = db.collection("loginpass");

			var logged_flag = false;

			if (login && password) {
				const crypto_password = crypto.createHmac('sha256', password)
                   .update(login)
                   .digest('hex');

                var user;
                if (user = await loginpass.findOne({login:login,password:crypto_password}) ) {

                	logged_flag = true;

                	//console.log(util.inspect(user));

                	var user_id = (user._id).toString();

                	console.log('user_id: '+user_id);

                	var hash_obj = await tools.checkHash(req,res);
					console.log('hash_obj: '+util.inspect(hash_obj)); 
					var hash_id = hash_obj.hash_id;

					var hashes = db.collection("hashes");

					var result = await hashes.update(
					    { _id: ObjectId(hash_id) },
					    {
					    	$set: {
					    		user_id:user_id,
					    		login:login
					    	}
					    },
					    { upsert: false, multi: true }
					)

					console.log('Update for result '+result);
                }
            }

            if (logged_flag) {
            	res.end('{result:logged}');
            } else {
            	res.end('{result:rejected}');
            }

		} catch(e){
			console.log(e);
			res.end('{result:error}');
		}
	
	})

	app.get('/api/get_posts',async function(req,res){
		
		try {

			var blogposts_collection = db.collection("blogposts");

			blogposts = await blogposts_collection.find({}).toArray();

			res.end(JSON.stringify(blogposts));
		} catch(e) {
			console.log(e);
			res.end('error');
		}
	
	})

	app.post('/api/add_post',async function(req,res){
		
		try {

			var blogposts = db.collection("blogposts");

			let post_name  = req.body.post_name;
			let post_description = req.body.post_description;

			await blogposts.insertOne({login:login,password:crypto_password})

			res.end('{result:ok}');
		} catch(e) {
			console.log(e);
			res.end('{result:error}');
		}
	
	})

	return app
}