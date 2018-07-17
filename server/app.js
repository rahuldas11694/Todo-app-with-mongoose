var express 	= require('express'),
	bodyParser 	= require('body-parser');

var {mongoose} 	= require('./db/mongoose'),
	{Todo} 		= require('./model/todo'),
	{User}		= require('./model/user');

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
	Todo.find()
	.then((todos)=>{
		res.send({
			todos
		});
	})
	.catch((err)=> {
		res.status(404).send(err);
	})
})

app.listen(3000, ()=>{
	console.log("Server on port 3000...")
})

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