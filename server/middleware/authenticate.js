var {User}		= require('./../model/user');


var authenticate = function(req,res,next){
	var token = req.header('x-auth');
	User.findOneByToken(token).then((user) => {
		if(!user){
			return Promise.reject();
		}
		req.user = user;
		req.token = token;
		next();

	})
	.catch((Error)=>{
		res.status(401).send({msg :"please login again"});
	})
}


module.exports = {authenticate};