const express = require('express'),
	  router = express.Router();

router.post('/register', (req, res) => {
	res.json(req.body)
});

module.exports = router
