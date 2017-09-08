const express = require('express'),
	  router = express.Router(),
	  User = require('../models/user'),
	  bcrypt = require('bcrypt-nodejs'),
	  jwt = require('jsonwebtoken'),
	  config = require('../config/database');


//Register user
router.post('/register', (req, res) => {
	if (!req.body.email) {
		res.json({success: false, message: 'You must provide an email.'})
	} else if (!req.body.username) {
		res.json({success: false, message: 'You must provide a username.'})
	} else if (!req.body.password) {
		res.json({success: false, message: 'You must provide a password.'})
	} else {
		let hash = bcrypt.hashSync(req.body.password);
		let user = new User({
        email: req.body.email.toLowerCase(),
        username: req.body.username.toLowerCase(),
        password: hash
    	});
    	user.save((err) => {
    		if (!err) {
    			res.json({success: true, message: 'User created.', user: user})
    		} else if (err.code == 11000) {
    			res.json({success: false, message: 'Username or email already taken.'})
    		} else if (err.errors.email) {
    			res.json({success: false, message: err.errors.email.message})
    		} else if (err.errors.username) {
    			res.json({success: false, message: err.errors.username.message})
    		} else if (err.errors.password) {
    			res.json({success: false, message: err.errors.password.message})
    		} else {
    			res.json({success: false, message: 'Database error.'})
    		} 
   		})
	}
});

//Find user
router.get('/checkUsername/:username', (req, res) => {
	if (!req.params.username) {
		res.json({success: false, message: 'Email was not provided.'})
	} else {
		User.findOne({username: req.params.username}, (err, user) => {
		if (err) {
			res.json({success: false, message: err})
		} else {
			if (user) {
				res.json({success: false, message: 'Username already taken.'})
			} else {
				res.json({success: true, message: 'Username is available.'})
			}
		}
	})
	}
});

//Find email
router.get('/checkEmail/:email', (req, res) => {
	if (!req.params.email) {
		res.json({success: false, message: 'Email was not provided.'});
	} else {
		User.findOne({email: req.params.email}, (err, email) => {
		if (err) {
			res.json({success: false, message: err});
		} else {
			if (email) {
				res.json({success: false, message: 'Email already taken.'});
			} else {
				res.json({success: true, message: 'Email is available.'});
			}
		}
	})
	}
});

//Login
router.post('/login', (req, res) => {
	if (!req.body.username) {
      res.json({ success: false, message: 'No username was provided.' }); 
    } else if (!req.body.password) {
    	res.json({ success: false, message: 'No password was provided.' }); 
    } else {
    	User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
    		if (err) {
    			res.json({success: false, message: err});
    		} else if (!user) {
    			res.json({success: false, message: 'Wrong username.'});
    		} else {
    			let password = bcrypt.compareSync(req.body.password, user.password);
    			if (!password) {
    				res.json({success: false, message: 'Wrong password.'});
    			} else {
    				const token = jwt.sign({userId: user._id}, config.secret, {expiresIn: '12h'});

    				res.json({success: true, message: 'Success!', token: token, user: user.username});
    			}
    		}
    	})
    }
});

router.use((req, res, next) => {
    const token = req.headers.authorisation; 
    if (!token) {
      res.json({success: false}); 
    } else {
      jwt.verify(token, config.secret, (err, token) => {
        if (err) {
          res.json({success: false, message: 'Token invalid'}); 
        } else {
          req.decoded = token;
          next();
        }
      });
    }
});

//Get profile
router.get('/profile', (req, res) => {
	User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
		if (err) {
			res.json({success: false, message: err})
		} else if (!user) {
			res.json({success: false, message: 'User not found'})
		} else {
			res.json({success: true, user: user})
		}
	})
});

module.exports = router
