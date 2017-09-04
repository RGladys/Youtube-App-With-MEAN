const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;



//Email length check function
let emailLengthCheck = (email) => {
	if (email.length < 5 || email.length > 30) {
      return false; 
    } else {
      return true; 
    }
};

//Email valid format check function
let emailValidCheck = (email) => {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email); 
};

//Email check object
const emailValidators = [
	{
		validator: emailLengthCheck,
		message: 'Email must contain at least 5 characters, but no more than 30'
	}, 
	{
		validator: emailValidCheck,
		message: 'Wrong format of an email'
	}
];



//Username length check function
let usernameLengthCheck = (username) => {
	if (username.length < 3 || username.length > 25) {
      return false; 
    } else {
      return true; 
    }
};

//Username check object
const usernameValidators = {
	validator: usernameLengthCheck,
	message: 'Username must contain at least 3 characters, but no more than 25'
};



//Password length check function
let passwordLengthCheck = (password) => {
	if (password.length < 8 || password.length > 30) {
      return false; 
    } else {
      return true; 
    }
};

//Password check object
const passwordValidators = {
	validator: passwordLengthCheck,
	message: 'Password must contain at least 8 characters, but no more than 30'
};



const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
  username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);