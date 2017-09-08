const express = require('express'),
	  router = express.Router(),
	  Post = require('../models/post'),
	  User = require('../models/user'),
	  jwt = require('jsonwebtoken'),
	  config = require('../config/database');


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

router.post('/newpost', (req, res) => {
	if (!req.body.link) {
		res.json({success: false, message: 'Youtube link is required'});
	} else if (!req.body.body) {
		res.json({success: false, message: 'Post must contain a text'});
	} else if (!req.body.author) {
		res.json({success: false, message: 'No author provided'});
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
				res.json({success: true, message: 'Post saved!'})
			}
		})
	}
});

//Get all posts
router.get('/getposts', (req, res) => {
	Post.find({}, (err, posts) => {
		if (err) {
			res.json({success: false, message: err})
		} else if (!posts) {
			res.json({success: false, message: 'No posts found.'})
		} else {
			res.json({success: true, posts: posts})
		}
	}).sort({'_id': -1});
});

//Get single post
router.get('/getpost/:id', (req, res) => {
	if (!req.params.id) {
		res.json({success: false, message: 'No post ID was provided.'})
	} else {
		Post.find({_id: req.params.id}, (err, post) => {
		if (err) {
			res.json({success: false, message: 'Invalid ID.'})
		} else if (!post) {
			res.json({success: false, message: 'Post not found.'})
		} else {
			User.findOne({_id: req.decoded.userId}, (err, user) => {
				if (err) {
					res.json({success: false, message: err})
				} else if (!user) {
					res.json({success: false, message: 'Unable to authenticate user.'})
				} else {
					if (user.username !== post[0].author) {
						res.json({success: false, message: 'You are not authorised to edit this post.'})
					} else {
						res.json({success: true, post: post})
					}
				}
			})
		}
	})
	}
});

//Update post
router.put('/updatepost', (req, res) => {
	if (!req.body._id) {
		res.json({success: false, message: 'No ID provided.'})
	} else {
		Post.findOne({_id: req.body._id}, (err, post) => {
			if (err) {
				res.json({success: false, message: 'Invalid ID.'})
			} else if (!post) {
				res.json({success: false, message: 'Post not found.'})
			} else {
				User.findOne({_id: req.decoded.userId}, (err, user) => {
					if (err) {
						res.json({success: false, message: 'Unable to authenticate user.'})
					} else if (!user) {
						res.json({success: false, message: 'User not found.'})
					} else {
						if (user.username !== post.author) {
							res.json({success: false, message: 'You are not authorised to edit this post.'})
						} else {
							post.body = req.body.body;
							post.save((err) => {
								if (err) {
									res.json({success: false, message: 'Post must containt at least 5 characters, but no more than 500.'})
								} else {
									res.json({success: true, message: 'Post updated!'})
								}
							})
						}
					}
				})
			}
		})
	}
});

//Delete post
router.delete('/deletepost/:id', (req, res) => {
	if (!req.params.id) {
		res.json({success: false, message: 'No ID provided.'})
	} else {
		Post.findOne({ _id: req.params.id}, (err, post) => {
			if (err) {
				res.json({success: false, message: 'Invalid ID.'})
			} else if (!post) {
				res.json({success: false, message: 'Post not found.'})
			} else {
				User.findOne({_id: req.decoded.userId}, (err, user) => {
					if (err) {
						res.json({success: false, message: err})
					} else if (!user) {
						res.json({success: false, message: 'Unable to authenticate user.'})
					} else {
						if (user.username !== post.author) {
						res.json({success: false, message: 'You are not authorised to delete this post.'})
						} else {
							post.remove((err) => {
								if (err) {
									res.json({success: false, message: err})
								} else {
									res.json({success: true, message: 'Post deleted!'})
								}
							})
						}
					}
				})
			}
		})
	}
})

module.exports = router