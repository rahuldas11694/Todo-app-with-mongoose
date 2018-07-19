var express 	= require('express'),
	bodyParser 	= require('body-parser');

var {mongoose} 	= require('./db/mongoose'),
	{Todo} 		= require('./model/todo'),
	{User}		= require('./model/user');
var _ 			= require('lodash');
var config = require('./config/config.js');
console.log("env----->",env)
const {ObjectId} = require("mongodb");
const port  = process.env.PORT || 3000;
var app = express();
// console.log("MONGOSE \n", mongoose);

app.use(bodyParser.json());

app.post('/todos', (req,res)=>{
	console.log("Req - ",req.body);
	// res.send(req.body);
	let body = req.body;
	var todo = new Todo({
		text : body.text,
		completed : body.completed,
		completedAt : body.completedAt
	});

	todo.save()
		.then((doc)=>{
			res.status(200).send(doc);
		})
		.catch((err)=>{
			res.status(400).send(err);
		})
});


app.get('/todos', (req,res)=>{
	console.log("123")
	Todo.find()
	.then((todos)=>{
		res.send({
			todos
		});
	})
	.catch((err)=> {
		res.status(404).send(err);
	})
});



app.get('/todos/:id', (req,res)=> {
	// res.send(req.params);
	var id = req.params.id;
	console.log('ID--->',id)
	if(!ObjectId.isValid(id)){
		return res.status(404).send({"message": "Not a valid Id"});
	}
	Todo.findById(id)
		.then((todo)=>{
			console.log("IN then",todo)
			res.send({todo});
		})
		.catch((err)=>{
			console.log("in error", err)
			res.status(400).send(err);
		})
});

app.delete('/todos/:id',(req, res)=> {
	let id = req.params.id;
	if(!ObjectId.isValid(id)){
		return res.status(404).send({"message": "Not a valid Id"});
	}
	console.log("ID->",id)
	Todo.findByIdAndRemove(id)
	.then((sult)=>{
		console.log("Object deleted",sult)
		if(!sult)
			return res.status(404).send({msg : "Not Found"})
		res.send({todo : sult});
	})
	.catch((err)=>{
		console.log("Error deleting",err)
		res.status(400).send(err);
	})
});


app.patch('/todos/:id',(req,res)=>{
	let id = req.params.id;
	console.log("INSIDE #PATCH")
	if(!ObjectId.isValid(id)){
		return res.status(404).send({"message": "Not a valid Id"});
	}

	let body = req.body;//_.pick(req.body,['text','completed']);
	console.log("BODY",body)
	console.log('isBoolean-->',_.isBoolean(body.completed))
	console.log('compeletd',(body.completed))
	if(_.isBoolean(body.completed) && body.completed){
		console.log("IN IF")
		body.completedAt = new Date().getTime();
	}else{
		console.log("IN ELSE")
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findOneAndUpdate(id,{$set : body}, {new:true})
	.then((todo)=>{
		console.log(todo);
		if(!todo){
			res.status(404).send({msg : "Object not found"})
		}
		res.send({todo});
	})
	.catch((err)=>{
		res.send({error: "error"})
	})
})


app.post('/users', (req,res) =>{
	var body = _.pick(req.body, ['email','password']);
	// console.log("BODY", req.body);

	var user = new User(body);

	user.save()
	.then((user)=>{
		console.log("User result")
		return user.generateAuthToken(user);
		// res.send({user})
	})
	.then((token) => {
		console.log("IN THEN", token)
		res.header('x-auth', token).send(user);
	})
	.catch((err)=>{
		console.log("Error  - >",err)
		res.send({err});;
	})

})

app.listen(3000,()=>{
	console.log("Server on port 3000...",port)
});

module.exports = {app};

/*var Todo = mongoose.model('Todo',{
	text : {
		type: 'String',
		required : true,
		minlength : 1,
		trim : true
	},
	completed : {
		type: 'Boolean',
		default : false
	},
	completedAt : {
		type: 'Number',
		default : null
	}
});

var User = mongoose.model('User',{
		email : {
			type: 'String',
			required : true,
			minlength : 1,
			trim : true
		}
	});


var newUser = new User({
	email : ''
})

newUser.save()
.then((res)=> {
	console.log(`Email Saved ${res}`)
})
.catch((err)=>{
	console.log(`Error ${err}`);
} )
var newTodo = new Todo({
	text : 'udemy course 2'
});

var newTodo1 = new Todo({
	text : 'node course',
	completed : false,
	completedAt : 123
});

var validateTodo = new Todo({
	text : 'see it'
})

validateTodo.save()
		.then((res)=>{
			console.log(`SAVED - ->${res}`);
		})
		.catch((err)=>{
			console.log(`Error - ->${err}`);	
		});

newTodo.save()
		.then((res)=>{
			console.log(`SAVED - ->${res}`);
		})
		.catch((err)=>{
			console.log(`Error - ->${err}`);	
		});

newTodo1.save()
		.then((res)=>{
			console.log(`SAVED - ->${res}`);
		})
		.catch((err)=>{
			console.log(`Error - ->${err}`);	
		});		*/

