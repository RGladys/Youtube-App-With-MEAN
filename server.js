const express = require('express'),
	  mongoose = require('mongoose'),
	  bodyParser = require('body-parser'),
	  authentication = require('./routes/authentication'),
	  config = require('./config/database'),
	  app = express();
mongoose.Promise = global.Promise;

//Database
mongoose.connect(config.uri, {
  useMongoClient: true,
}, (err) => {
  //Check if database was able to connect
  if (err) {
    console.log('Could NOT connect to database: ', err);
  } else {
    console.log('Connected to ' + config.db);
  }
});

//Middleware
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use('/auth', authentication);

//Start server
app.listen(3000, () => {
	console.log('Server listens...')
})