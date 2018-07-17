const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require("./../server/model/todo");

const {ObjectId} = require("mongodb");

var id = "5b4de9b426e586c970000856";

if(!ObjectId.isValid(id)){
	return console.log("Invalid Id")
}

Todo.find({
	_id : id
})
.then((todos)=>{

	if(!todos || !todos.length){
		return console.log("Todos not found");
	}
	console.log("Todos - ", todos);
})
.catch((err) => {
	console.log("Error",err)
})

Todo.findOne({
	_id : id
})
.then((todo)=>{
	console.log("Todos12 - ", todo);
})



