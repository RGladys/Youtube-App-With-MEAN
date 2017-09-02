const express = require('express'),
	  mongoose = require('mongoose'),
	  bodyParser = require('body-parser'),
	  authentication = require('./routes/authentication'),
	  app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use('/auth', authentication);

//Start server
app.listen(3000, () => {
	console.log('Server listens...')
})