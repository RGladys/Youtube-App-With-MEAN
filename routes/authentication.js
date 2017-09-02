const express = require('express'),
	  router = express.Router(),
	  User = require('../models/user');


//Register user
router.post('/register', (req, res) => {
	if (!req.body.email) {
		res.json({succes: false, message: 'You must provide an email'})
	} else if (!req.body.username) {
		res.json({succes: false, message: 'You must provide a username'})
	} else if (!req.body.password) {
		res.json({succes: false, message: 'You must provide a password'})
	} else {
		let user = new User({
        email: req.body.email.toLowerCase(),
        username: req.body.username.toLowerCase(),
        password: req.body.password
    	});
    	user.save((err) => {
    		if (!err) {
    			res.json({succes: true, message: 'User created'})
    		} else if (err.code == 11000) {
    			res.json({succes: false, message: 'Username or email already taken'})
    		} else {
    			res.json({succes: false, message: err})
    		} 
   		})
	}
});

//Find user
router.get('/:username', (req, res) => {
	User.find({username: req.params.username}, (err, user) => {
		if (!user) {
			res.send('Nie znaleziono')
		} else {
			res.send(user)
		}
	})
})

module.exports = router
