// const MongoClient = require('mongodb').MongoClient;
// the above line can be written as follows - ES-6 object destucturing
const {MongoClient, ObjectId} = require('mongodb');


// start mongo $> ./mongod --dbpath ~/mongo-data/
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
	if(err)
		return console.log("Unable to co to Db",err);
		console.log("DB Connected");

		/*db.collection("Todos").find({compeleted : true}).toArray().then((res)=>{
			console.log("the data fetched",JSON.stringify(res,undefined, 4))
		},(err)=> {
			console.log(JSON.stringify(err,undefined, 4))
		})*/

		db.collection("Users").find({name : 'mehi'}).count().then((count)=>{
			console.log("the data fetched",JSON.stringify(count,undefined, 4))
		},(err)=> {
			console.log(JSON.stringify(err,undefined, 4))
		})


	db.close();

})