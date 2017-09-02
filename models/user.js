const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

let emailLengthCheck = (email) => {
	if (email.length < 5 || email.length > 30) {
      return false; 
    } else {
      return true; 
    }
};

const emailValidators = {
	validator: emailLengthCheck,
	message: 'Email must contain at least 5 characters, but no more than 30'
};

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
  username: { type: String, required: true, unique: true, lowercase: true},
  password: { type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);