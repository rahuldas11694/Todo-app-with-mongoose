const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require("./../server/model/todo");

const {ObjectId} = require("mongodb");

var id = "5b4de9b426e586c970000856";

if(!ObjectId.isValid(id)){
	return console.log("Invalid Id")
}

// Todo.remove({})
// .then((result)=>{
// 	console.log("result ",result);
// })

// Todo.findOneAndRemove

Todo.findByIdAndRemove('5b4ef1308d6291805bf50269')
.then((sult)=>{
	console.log("result", sult);
})
.catch((err)=>{
	console.log("error removing",err)
})