const express = require('express'),
	  mongoose = require('mongoose'),
	  bodyParser = require('body-parser'),
	  authentication = require('./routes/authentication'),
    posts = require('./routes/posts'),
	  config = require('./config/database'),
    path = require('path'),
    cors = require('cors'),
	  app = express();
    port = process.env.PORT || 8080;
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
app.use(cors({
  origin: 'http://localhost:4200',
}))
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use('/auth', authentication);
app.use('/posts', posts);
app.use(express.static(__dirname + '/client/dist/'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

//Start server
app.listen(port, () => {
	console.log('Server listens...')
})