const mongoose = require('mongoose');
const {Schema} = mongoose
const bcrypt =require('bcrypt-nodejs');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
  email:        { type:String, required:true, lowercase:true, trim:true, unique:true },
  password:     { type:String, required:true },
  name:         { type:String },
  company:      { type:String },
  salt:         { type:String },
  role:         { type:String },
  created:      { type:Number, default: Date.now()}
})

UserSchema.plugin(uniqueValidator);

UserSchema.methods.setPassword = function(candidatePassword,callback) {
  bcrypt.genSalt(10, (err, salt) => {
		this.salt = salt
		if(!candidatePassword){ return callback(null,this) }
    bcrypt.hash(candidatePassword, salt, null, (err, hash) => {
			this.password = hash
			if(err){
				console.log(err)
				return callback(err)
			} else {
				return callback(null,this)
			}
		})
	})
}

UserSchema.methods.authorize = function (candidatePassword, callback) {
	if(!candidatePassword){
    console.log("no candidate password");
		return callback(new Error("No Password Provided"))
	}
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) {
			console.log("Error occured comparing hashpass with rawpass");
			console.log(err);
			return callback(err);
		}
		isMatch ? callback(null,this) : callback(new Error("Incorrect Password"))
  });
};

const User = mongoose.model('user',UserSchema)
  // let newUser = new User({
  // 	email:"accounts@paradeigm.com",
  // })
  // newUser.setPassword("marketing",(err,user) => {
  // 	user.save((err,saved) => {console.log(err,saved)})
  // })
module.exports = User
