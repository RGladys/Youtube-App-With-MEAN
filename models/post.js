const mongoose = require('mongoose'),
	    Schema = mongoose.Schema;



//Body length check function
let bodyLengthCheck = (body) => {
	if (body.length < 5 || body.length > 500) {
      return false; 
    } else {
      return true; 
    }
};

//Body check object
const bodyValidators = [
	{
		validator: bodyLengthCheck,
		message: 'Post must contain at least 5 characters, but no more than 400'
	}
];



//Comment length check function
let commentLengthCheck = (comment) => {
	if (comment[0].length < 5 || comment[0].length > 300) {
      return false; 
    } else {
      return true; 
    }
};

//Comment check object
const commentValidators = {
	validator: commentLengthCheck,
	message: 'Comment must contain at least 5 characters, but no more than 200'
};



const postSchema = new Schema({
  link: { type: String, required: true },
  body: { type: String, required: true, validate: bodyValidators },
  author: { type: String, required: true },
  date: { type: String, default: Date.now() },
  comments: [
    {
      comment: { type: String, validate: commentValidators },
      commentAuthor: { type: String }
    }
  ]
});

module.exports = mongoose.model('Post', postSchema);