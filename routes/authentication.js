const express = require('express'),
	  router = express.Router(),
	  User = require('../models/user'),
	  bcrypt = require('bcrypt-nodejs');


//Register user
router.post('/register', (req, res) => {
	if (!req.body.email) {
		res.json({succes: false, message: 'You must provide an email'})
	} else if (!req.body.username) {
		res.json({succes: false, message: 'You must provide a username'})
	} else if (!req.body.password) {
		res.json({succes: false, message: 'You must provide a password'})
	} else {
		let hash = bcrypt.hashSync(req.body.password);
		let user = new User({
        email: req.body.email.toLowerCase(),
        username: req.body.username.toLowerCase(),
        password: hash
    	});
    	user.save((err) => {
    		if (!err) {
    			res.json({succes: true, message: 'User created', user: user})
    		} else if (err.code == 11000) {
    			res.json({succes: false, message: 'Username or email already taken'})
    		} else if (err.errors.email) {
    			res.json({succes: false, message: err.errors.email.message})
    		} else if (err.errors.username) {
    			res.json({succes: false, message: err.errors.username.message})
    		} else if (err.errors.password) {
    			res.json({succes: false, message: err.errors.password.message})
    		} else {
    			res.json({succes: false, message: 'Database error'})
    		} 
   		})
	}
});

//Find user
router.get('/checkUsername/:username', (req, res) => {
	if (!req.params.username) {
		res.json({succes: false, message: 'Email was not provided'})
	} else {
		User.findOne({username: req.params.username}, (err, user) => {
		if (err) {
			res.json({succes: false, message: err})
		} else {
			if (user) {
				res.json({succes: false, message: 'Username already taken'})
			} else {
				res.json({succes: true, message: 'Username is available'})
			}
		}
	})
	}
})

//Find email
router.get('/checkEmail/:email', (req, res) => {
	if (!req.params.email) {
		res.json({succes: false, message: 'Email was not provided'})
	} else {
		User.findOne({email: req.params.email}, (err, email) => {
		if (err) {
			res.json({succes: false, message: err})
		} else {
			if (email) {
				res.json({succes: false, message: 'Email already taken'})
			} else {
				res.json({succes: true, message: 'Email is available'})
			}
		}
	})
	}
})

module.exports = router
