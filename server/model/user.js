var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var UserSchema = new mongoose.Schema({
		email : {
			type: 'String',
			required : true,
			minlength : 1,
			trim : true,
			unique : true,
			validate : {
				validator : (value)=> {
					return validator.isEmail(value)
				},
				message : '{VALUE} is not a valid email' 
			}

		},
		password : {
			type : "String",
			required : true,
			minlength : 6
		},
		tokens :[{
			access : {
				type : String,
				required : true
			},
			token : {
				type : String,
				required : true
			}
		}]
	});

UserSchema.methods.toJSON = function(){
	var user = this; 
	console.log("toJSON function-->",user);

	var userObject = user.toObject();
console.log("USER OBJECT  ->",userObject);	
	return _.pick(userObject,['_id','email']);
}

UserSchema.methods.generateAuthToken = function(){
	var user = this;
	console.log("USER HERE",user)
	var access = "auth";
	var token = jwt.sign({_id : user._id.toHexString(), access}, 'qwerty').toString();

	user.tokens = user.tokens.concat({access, token});

	return user.save()
	.then(()=> {
		console.log("USER TOKEN", token)
		return token;
	})
	.catch((err)=>{
		console.log("generateAuthToken ERROR - ", err);
		return new Error(err);
	})

}

UserSchema.statics.findOneByToken = function(token){
	var User = this;
	var decoded;

	try {
		decoded = jwt.verify(token,'qwerty');
	}
	catch(err){
		console.log("INSIDE CATCH");
		/*return new Promise((resolve,reject)=>{
			reject();
		})*/
		return Promise.reject(err);
	}
	console.log("DECODED ->",decoded)
	return User.findOne({
		'_id'	: decoded._id,
		'tokens.token' : token,
		'tokens.access' : 'auth'
	});
}

var User = mongoose.model('User',UserSchema);

module.exports = {User};