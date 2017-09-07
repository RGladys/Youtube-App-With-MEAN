const express = require('express'),
	  router = express.Router(),
	  Post = require('../models/post'),
	  jwt = require('jsonwebtoken'),
	  config = require('../config/database');


// router.use((req, res, next) => {
//     const token = req.headers.authorisation; 
//     if (!token) {
//       res.json({success: false}); 
//     } else {
//       jwt.verify(token, config.secret, (err, token) => {
//         if (err) {
//           res.json({success: false, message: 'Token invalid'}); 
//         } else {
//           req.decoded = token;
//           next();
//         }
//       });
//     }
// });

router.post('/newpost', (req, res) => {
	if (!req.body.link) {
		res.json({succes: false, message: 'Youtube link is required'});
	} else if (!req.body.body) {
		res.json({succes: false, message: 'Post must contain a text'});
	} else if (!req.body.author) {
		res.json({succes: false, message: 'No author provided'});
	} else {
		const post = new Post({
			link: req.body.link,
			body: req.body.body,
			author: req.body.author
		});
		post.save((err) => {
			if (err) {
				if (err.errors) {
					if (err.errors.link) {
						res.json({succes: false, message: err.errors.link.message});
					} else if (err.errors.body) {
                    	res.json({success: false, message: err.errors.body.message});
					} else {
                    	res.json({ success: false, message: 'Error' }); 
					}
				} else {
					res.json({success: false, message: 'Error'});
				}
			} else {
				res.json({succes: true, message: 'Post saved!'})
			}
		})
	}
});

//Get all posts
router.get('/getposts', (req, res) => {
	Post.find({}, (err, posts) => {
		if (err) {
			res.json({succes: false, message: err})
		} else if (!posts) {
			res.json({succes: false, message: 'No posts found.'})
		} else {
			res.json({succes: true, posts: posts})
		}
	}).sort({'_id': -1});
});

//Get single post
router.get('/getpost/:post', (req, res) => {
	res.send(req.params.post)
})
module.exports = router