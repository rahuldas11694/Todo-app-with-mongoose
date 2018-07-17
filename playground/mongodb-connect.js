// const MongoClient = require('mongodb').MongoClient;
// the above line can be written as follows - ES-6 object destucturing
const {MongoClient, ObjectId} = require('mongodb');


// start mongo $> ./mongod --dbpath ~/mongo-data/
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
	if(err)
		return console.log("Unable to co to Db",err);
		console.log("DB Connected");


		/*db.collection('Todos').insertOne({
			text : "Hello mongo",
			completed : false
		}, (err, result)=>{
			if(err)
				return console.log("SOmethign went wrng", err);
			console.log(JSON.stringify(result.ops, undefined, 2));

		});*/

		db.collection('Users').insertOne({
			name : "mehi",
			location : "borivaliu",
			age: 23
		}, (err, result)=>{
			if(err)
				return console.log("SOmethign went wrng", err);

			return console.log(JSON.stringify(result.ops, undefined, 2),`TIME STAMP ${result.ops[0]._id.getTimestamp()}` );

		});


	db.close();

})