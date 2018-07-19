var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs')
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
};

UserSchema.statics.findByCredentials = function(email,password){
	var User = this;

	return User.findOne({email})
	.then((user)=>{
		if(!user){
			return Promise.reject({msg : "user not found"});
		}
	console.log("USER BE",user.password)
	return new Promise((resolve,reject)=>{
		bcrypt.compare(password, user.password, (err, res)=>{
			if(res)
				resolve(user);
			reject({message : "Wrong Password"})
		})
	})	

	})
}

// this is a mongoose middleware which executes before savin data to DB
UserSchema.pre('save', function(next){
	var user = this;
	if(user.isModified('password')){
		bcrypt.genSalt(10, function(err,salt){
			console.log("SALT-->",salt)
			bcrypt.hash(user.password,salt,(err,hash)=>
			{
				user.password = hash;
				console.log("hash created in save : ",hash);
				next();
			})
		})

	}else{
		next();
	}
})


var User = mongoose.model('User',UserSchema);

module.exports = {User};