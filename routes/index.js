var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res) {
	res.render('helloworld', { title: 'Hello, World!' })
});

router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e, docs){
		res.render('userlist', {
			"userlist": docs
		});
	});
});

router.get('/newuser', function(req, res) {
	res.render('newuser', {title: 'Add New User'});
});

router.post('/adduser', function(req, res) {
	// set our internal DB variable
	var db = req.db;

	// get our form values. they rely on the "name" attributes
	var userName = req.body.username;
	var userEmail = req.body.email;

	// set our collection
	var collection = db.get('usercollection');

	//submit to the DB
	collection.insert({ "username": userName, "email": userEmail },
		function(err, doc) {
			if (err) {
				// if failed, return error
				res.send("There was a problem adding the information to the database.");
			} else {
				// if it worked, set the header so the address bar doesn't still say /adduser
				res.location("userlist");
				res.redirect("userlist");
			}
		});
});

module.exports = router;
